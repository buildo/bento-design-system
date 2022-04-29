import * as React from "react";
import { Body, Card, Stack, Title } from "..";

export default function CardExample() {
  return (
    <Card elevation="small" borderRadius={16} paddingX={40} paddingY={16}>
      <Stack space={8}>
        <Title size="large">This is a card!</Title>
        <Body size="large">This is a description.</Body>
      </Stack>
    </Card>
  );
}
