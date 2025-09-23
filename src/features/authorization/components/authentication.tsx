import {Button, CloseButton, Drawer, Input, Portal, Stack} from "@chakra-ui/react"
import {useRef} from "react"

export default function Authentication() {
    const ref = useRef<HTMLInputElement | null>(null)
    return (
        <Drawer.Root initialFocusEl={() => ref.current} restoreFocus={true}>
            <Drawer.Trigger asChild>
                <Button variant="outline" size="sm">
                    Authenticate
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner padding="20">
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Authentication</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <p>
                                Please, fill the login and password areas. Check the "register" box if you have no registered account.
                            </p>
                            <Stack mt="5">
                                <Input ref={ref} placeholder="Authentication" />
                                <Input placeholder="Password" />
                            </Stack>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
