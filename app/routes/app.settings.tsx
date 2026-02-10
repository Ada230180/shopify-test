import { Button, Page, Layout, Card, BlockStack, Text } from "@shopify/polaris";

export default function Settings() {
  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text as="p" variant="bodyLg">
                  just shut ur ass up
                </Text>
                <Button variant="secondary" size="micro" fullWidth={false}>
                  Lick ma balls
                </Button>
                <Button variant="primary" fullWidth={false}>
                  bruh
                </Button>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                {/* Für Haupt-Überschriften */}
                <Text as="h1" variant="headingXl">
                  Das ist eine riesige Überschrift (headingXl)
                </Text>

                {/* Für Unter-Überschriften */}
                <Text as="h2" variant="headingMd">
                  Das ist eine normale Überschrift (headingMd)
                </Text>

                {/* Für normalen Fließtext (Standard) */}
                <Text as="p" variant="bodyMd">
                  Das ist ganz normaler Text, wie in einem Brief. (bodyMd)
                </Text>

                {/* Für Kleingedrucktes oder Hinweise */}
                <Text as="p" variant="bodySm" tone="subdued">
                  Das ist kleines Kleingedrucktes. (bodySm)
                </Text>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
