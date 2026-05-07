import { showHUD, Clipboard, List, ActionPanel, Action } from "@raycast/api";

const object = [
  {
    id: "1",
    sectionTitle: "SSH Commands",
    subtitle: "Connect to a VM via SSH",
    commands: [
      {
        id: "1",
        title: "Dev 3",
        subtitle: "Connect to the dev 3 environment",

        command: "ssh azureuser@encompass-one-vm-dev-3.eastus.cloudapp.azure.com",
      },
      {
        id: "2",
        title: "Dev 2",
        subtitle: "Connect to the dev 2 environment",

        command: "ssh azureuser@encompass-one-vm-dev-2.eastus.cloudapp.azure.com",
      },
      {
        id: "3",
        title: "Dev 1",
        subtitle: "Connect to the dev 1 environment",

        command: "ssh azureuser@encompass-one-vm-dev-1.eastus.cloudapp.azure.com",
      },
    ],
  },
];

export default function Command() {
  const now = new Date();
  // await Clipboard.copy(now.toLocaleDateString());
  // await showHUD("Copied date to clipboard");
  return (
    <List navigationTitle="Search Commands" searchBarPlaceholder="Search Encompass Commands">
      {object.map((section) => (
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
      {/* {commands.map((c) => ( */}
      {/*   <List.Item */}
      {/*     key={c.id} */}
      {/*     title={c.title} */}
      {/*     subtitle={c.subtitle} */}
      {/*     accessories={[{ text: c.command }]} */}
      {/*     actions={ */}
      {/*       <ActionPanel> */}
      {/*         <Action.Paste content={c.command} /> */}
      {/*       </ActionPanel> */}
      {/*     } */}
      {/*   /> */}
      {/* ))} */}
    </List>
  );
}
