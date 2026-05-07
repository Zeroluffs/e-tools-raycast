import { List, ActionPanel, Action } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import { useState, useEffect } from "react";

export interface CommandInterface {
  id: string;
  title: string;
  subtitle: string;
  command: string;
  markdown: string;
  keywords: string[];
}
export interface Section {
  id: string;
  sectionTitle: string;
  subtitle: string;
  commands: CommandInterface[];
  value: string;
}
export interface CommandsObject {
  version: number;
  commands: Section[];
}
export default function Command() {
  const [showDetail, setShowDetail] = useState(false);
  const [section, setSection] = useState("");

  const { data, isLoading } = useCachedPromise(async () => {
    const res = await fetch("https://raw.githubusercontent.com/Zeroluffs/e-comands/main/commands.json");
    return res.json() as Promise<CommandsObject>;
  });
  const alldata = data?.commands;
  const [filteredData, setFilteredData] = useState<Section[] | undefined>(alldata);
  const onChangeSection = (newValue: string) => {
    setSection(newValue);
  };
  useEffect(() => {
    if (section == "all") {
      setFilteredData(alldata);
    } else {
      const filtered = data?.commands?.filter((item) => item.value.includes(section));
      setFilteredData(filtered);
    }
  }, [section]);
  return (
    <List
      isShowingDetail={showDetail}
      isLoading={isLoading}
      navigationTitle="Search Commands"
      searchBarPlaceholder="Search Encompass Commands"
      searchBarAccessory={
        <List.Dropdown tooltip="Filter by Section" onChange={onChangeSection}>
          <List.Dropdown.Item title={"All"} value={"all"}></List.Dropdown.Item>
          {alldata?.map((section) => (
            <List.Dropdown.Item title={section.sectionTitle} value={section.value}></List.Dropdown.Item>
          ))}
        </List.Dropdown>
      }
    >
      {filteredData?.map((section) => (
        <List.Section key={section.id} title={section.sectionTitle} subtitle={section.subtitle}>
          {section.commands.map((command) => (
            <List.Item
              key={command.id}
              title={command.title}
              subtitle={command.subtitle}
              accessories={[{ text: command.command }]}
              detail={<List.Item.Detail markdown={command.markdown}></List.Item.Detail>}
              keywords={command.keywords}
              actions={
                <ActionPanel>
                  <Action
                    onAction={() => setShowDetail((value) => !value)}
                    title={showDetail ? "Hide Details" : "Show Details"}
                    shortcut={{ modifiers: ["cmd"], key: "d" }}
                  />

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
