import {
  Menu,
  Button,
  rem,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconSettings,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconArrowsLeftRight,
  IconTrash,
  IconMoon,
  IconSun,
  IconSunMoon,
  IconDots,
  IconBrandGithub,
} from "@tabler/icons-react";

export function MainMenu() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          color="gray"
          size="lg"
          variant="subtle"
          style={{
            marginRight: "auto",
          }}
        >
          <IconDots />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconBrandGithub style={{ width: rem(14), height: rem(14) }} />
          }
          component="a"
          href="https://github.com/meesvandongen/anime-table"
          target="_blank"
        >
          Github
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Theme</Menu.Label>
        <Menu.Item
          onClick={() => setColorScheme("dark")}
          leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
          color={colorScheme === "dark" ? "blue" : undefined}
        >
          Dark
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSun style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => setColorScheme("light")}
          color={colorScheme === "light" ? "blue" : undefined}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconSunMoon style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => setColorScheme("auto")}
          color={colorScheme === "auto" ? "blue" : undefined}
        >
          Auto
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
