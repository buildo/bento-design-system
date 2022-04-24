import { createButtons, defaultConfigs, Body } from "../../src";

const { Button } = createButtons(defaultConfigs.button);

const _ok1 = <Button label="test1" onPress={() => {}} kind="solid" hierarchy="primary" />;
const _ok2 = <Button label="test2" onPress={() => {}} kind="solid" hierarchy="primary" />;
// @ts-expect-error
const _fail = <Button label="wrong" onPress={() => {}} kind="solid" hierarchy="primary" />;
