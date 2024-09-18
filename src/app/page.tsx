import { Card, CardBody } from "@nextui-org/react";
import { sql } from "drizzle-orm";

import db from "@/db";

export default async function Home() {
  const result = await db.execute(sql`
    SELECT * FROM pg_catalog.pg_tables
  `);
  return (
    <Card className="mx-auto mt-4 max-w-md">
      <CardBody className="text-center">
        <h1 className="text-5xl">Next.js Starter</h1>
        <p className="text-xl">A simple starter for Next.js</p>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </CardBody>
    </Card>
  );
}
