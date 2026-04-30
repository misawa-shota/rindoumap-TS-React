import { Heading, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from '@inertiajs/react';

const AppLogo = () => {
    return (
        <Link href="/">
            <Heading as={"h1"}>
                <HStack alignItems="center">
                    <Image src={"/storage/images/icon.svg"} alt="RindouMap Logo" boxSize="40px" mr={2} />
                    <Text fontSize="2xl" fontWeight="bold">林道マップ</Text>
                </HStack>
            </Heading>
        </Link>
    );
};

export default AppLogo;
