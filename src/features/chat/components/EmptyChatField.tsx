import {Center, EmptyState, VStack} from "@chakra-ui/react";
import {HiColorSwatch} from "react-icons/hi";

export default function EmptyChatField() {
    return (
        <div className="h-full flex justify-center place-items-center p-0.5">
            <Center className="flex flex-col">
                <EmptyState.Root>
                    <EmptyState.Content>
                        <EmptyState.Indicator>
                            <HiColorSwatch />
                        </EmptyState.Indicator>
                        <VStack textAlign="center">
                            <EmptyState.Title><p>No chat is currently chosen</p></EmptyState.Title>
                            <EmptyState.Description>
                                Create a chat with other user
                            </EmptyState.Description>
                        </VStack>
                    </EmptyState.Content>
                </EmptyState.Root>
            </Center>
        </div>
    )
}