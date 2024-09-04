"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Layout } from "@/src/features/layout/Layout"



export default function RouteError() {
    return (
        <Layout>
            <Card>
                <CardHeader>
                    <CardTitle>
                        User not found
                    </CardTitle>
                    <CardDescription>The User may deleted or you don t have the permission to view it.</CardDescription>
                </CardHeader>
                <CardFooter>
                </CardFooter>
            </Card>
        </Layout>
    )
}

