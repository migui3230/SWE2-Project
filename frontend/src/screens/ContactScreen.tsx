import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  Center,
  rem,
  Box,
} from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][7]} 100%)`,
    borderRadius: theme.radius.md,
    padding: `calc(${theme.spacing.xl} * 2.5)`,

    [theme.fn.smallerThan("sm")]: {
      padding: `calc(${theme.spacing.xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: rem(300),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    "&:hover": {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const ContactScreen = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      subject: (value) =>
        value.trim().length > 0 ? null : "Subject is required",
      message: (value) =>
        value.trim().length > 0 ? null : "Message is required",
    },
  });

  return (
    <div className={classes.wrapper}>
      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>
        </div>
        <div className={classes.form}>
          <Box maw={300} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                classNames={{ input: classes.input, label: classes.inputLabel }}
                {...form.getInputProps("email")}
              />

              <TextInput
                label="Subject"
                placeholder="Example Subject"
                mt="md"
                required
                classNames={{ input: classes.input, label: classes.inputLabel }}
                {...form.getInputProps("subject")}
              />

              <Textarea
                required
                label="Your message"
                placeholder="I want to order your goods"
                minRows={4}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
                {...form.getInputProps("message")}
              />

              <Group position="right" mt="md">
                <Button className={classes.control} type="submit">
                  Send message
                </Button>
              </Group>
            </form>
          </Box>
        </div>
      </SimpleGrid>
    </div>
  );
};

export default ContactScreen;
