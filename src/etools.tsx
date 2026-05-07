import { List, ActionPanel, Action } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

export interface CommandInterface {
  id: string;
  title: string;
  subtitle: string;
  command: string;
}
export interface Section {
  id: string;
  sectionTitle: string;
  subtitle: string;
  commands: CommandInterface[];
}
export interface CommandsObject {
  version: number;
  commands: Section[];
}
export default function Command() {
  const { data, isLoading } = useCachedPromise(async () => {
    const res = await fetch("https://raw.githubusercontent.com/Zeroluffs/e-comands/main/commands.json");
    return res.json() as Promise<CommandsObject>;
  });
  return (
    <List isLoading={isLoading} navigationTitle="Search Commands" searchBarPlaceholder="Search Encompass Commands">
      {data?.commands?.map((section) => (
        <List.Section key={section.id} title={section.sectionTitle} subtitle={section.subtitle}>
          {section.commands.map((command) => (
            <List.Item
              key={command.id}
              title={command.title}
              subtitle={command.subtitle}
              accessories={[{ text: command.command }]}
              actions={
                <ActionPanel>
                  <Action.Paste content={command.command} />
                </ActionPanel>
              }
            ></List.Item>
          ))}
        </List.Section>
      ))}
    </List>
  );
}
