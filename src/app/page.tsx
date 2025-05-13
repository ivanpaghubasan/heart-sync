import { Button } from "@heroui/button";
import Link from 'next/link';
import { FaRegSmile } from "react-icons/fa";

export default function HomeHome() {
    return (
        <>
            <h1 className="text-3xl">Hello App!</h1>
            <Button
                as={Link}
                href="/members"
                color="primary"
                variant="bordered"
                startContent={<FaRegSmile size={20} />}
            >
                Click Me!
            </Button>
        </>
    );
}
