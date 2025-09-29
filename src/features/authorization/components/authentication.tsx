import {Button, Checkbox, CloseButton, Drawer, Input, Portal, Stack} from "@chakra-ui/react"
import {useRef, useState} from "react"
import * as React from "react";
import {useLoginUser, useRegisterUser} from "../../../hooks/useUser.ts"

export default function Authentication() {
    const ref = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);

    const registerUser = useRegisterUser();
    const loginUser = useLoginUser();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (register) {
            const registerResp = await registerUser.mutateAsync({username, password})
            console.log("Registration attempt response: "+registerResp)
        } else {
            loginUser.mutate({ username, password },
            {onSuccess: (data) => {
                console.log("login successful: "+data);
            }},
            );
        }
    };

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
                    <Drawer.Content bg="white" color="#272830">
                        <Drawer.Header>
                            <Drawer.Title>Authentication</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <p>
                                Please, fill the login and password areas. Check the "register"
                                box if you have no registered account.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <Stack mt="5">
                                    <Input
                                        ref={ref}
                                        placeholder="Login"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Checkbox.Root
                                        checked={register}
                                        onCheckedChange={() => setRegister(!register)}
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>Register</Checkbox.Label>
                                    </Checkbox.Root>
                                </Stack>
                                <Drawer.Footer>
                                    <Button type="submit"
                                            color="white"
                                            bg="#272830"
                                            _hover={{ bg: "white", color: "#272830", borderRadius:"md", borderColor: "#272830" }}>
                                        {register ? "Register" : "Login"}
                                    </Button>
                                </Drawer.Footer>
                            </form>
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}
