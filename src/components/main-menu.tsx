import { Menu, rem, ActionIcon, useMantineColorScheme } from "@mantine/core";
import {
  IconMoon,
  IconSun,
  IconSunMoon,
  IconDots,
  IconBrandGithub,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import { getIsLoggedIn } from "../utils";

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

        {getIsLoggedIn() ? (
          <Menu.Item
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
            component="a"
            href="/api/logout"
          >
            Logout
          </Menu.Item>
        ) : (
          <Menu.Item
            leftSection={
              <IconLogin style={{ width: rem(14), height: rem(14) }} />
            }
            component="a"
            href="/api/login"
          >
            Login (MAL)
          </Menu.Item>
        )}

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
