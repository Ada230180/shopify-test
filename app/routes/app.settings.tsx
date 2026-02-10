import { Button, Page, Layout, Card, BlockStack, Text } from "@shopify/polaris";

export default function Settings() {
  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="p" variant="bodyMd">
                Hier kannst du bald deine Einstellungen vornehmen.
              </Text>
              <Button variant="primary">Add Product</Button>;
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
