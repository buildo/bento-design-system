import * as React from "react";
import { Body, Card, Stack, Title } from "..";
import { formatMessage } from "../formatMessage";

export default function CardExample() {
  return (
    <Card elevation="small" borderRadius={16} paddingX={40} paddingY={16}>
      <Stack space={8}>
        <Title size="large">{formatMessage("This is a card!")}</Title>
        <Body size="large">{formatMessage("This is a description.")}</Body>
      </Stack>
    </Card>
  );
}
