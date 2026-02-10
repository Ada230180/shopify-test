import {
  Button,
  Page,
  Layout,
  TextField,
  Banner,
  Select,
  Checkbox,
  Card,
  BlockStack,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

//  WICHTIG: Das sind die Imports für DEINE App (React Router v7)
import { useLoaderData, useSubmit, useActionData } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import prisma from "../db.server";
import { authenticate } from "../shopify.server";

// --- LOADER ---
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const settings = await prisma.settings.findFirst({
    where: { shop: session.shop },
  });

  // In v7 brauchen wir kein "json()", wir geben das Objekt einfach zurück
  return settings || { priority: "Normal", message: "", autoReply: false };
};

// --- ACTION ---
export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();

  await prisma.settings.upsert({
    where: { shop: shop },
    update: {
      priority: formData.get("priority") as string,
      message: formData.get("message") as string,
      autoReply: formData.get("autoReply") === "true",
    },
    create: {
      shop: shop,
      priority: formData.get("priority") as string,
      message: formData.get("message") as string,
      autoReply: formData.get("autoReply") === "true",
    },
  });

  return { status: "success" };
};

// --- FRONTEND ---
export default function SupportPage() {
  // Das "as any" hilft hier kurzfristig gegen Typ-Probleme
  const geladeneDaten = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  const [selected, setSelected] = useState(geladeneDaten?.priority || "Normal");
  const [value, setValue] = useState(geladeneDaten?.message || "");
  const [checked, setChecked] = useState(geladeneDaten?.autoReply || false);

  const handleSelectChange = useCallback((val: string) => setSelected(val), []);
  const handleTextFieldChange = useCallback((val: string) => setValue(val), []);
  const handleCheckboxChange = useCallback(
    (val: boolean) => setChecked(val),
    [],
  );

  const handleSave = () => {
    const data = new FormData();
    data.append("priority", selected);
    data.append("message", value);
    data.append("autoReply", String(checked));

    submit(data, { method: "post" });
  };

  const options = [
    { label: "Normal", value: "Normal" },
    { label: "Hoch", value: "Hoch" },
    { label: "Dringend", value: "Dringend" },
  ];

  const showSuccess = actionData?.status === "success";

  return (
    <Page title="Support">
      <Layout>
        <Layout.Section>
          {showSuccess && (
            <Banner tone="success" title="Gespeichert">
              Deine Einstellungen wurden aktualisiert
            </Banner>
          )}
        </Layout.Section>

        <Layout.AnnotatedSection
          title="Kontakt-Optionen"
          description="Lege fest, wie Kunden dich kontaktieren können."
        >
          <Card>
            <BlockStack gap="400">
              <Select
                label="Priorität"
                options={options}
                value={selected}
                onChange={handleSelectChange}
              />

              <TextField
                label="Nachricht an Kunden"
                value={value}
                onChange={handleTextFieldChange}
                autoComplete="off"
                multiline={4}
              />

              <Checkbox
                label="Automatische Empfangsbestätigung"
                checked={checked}
                onChange={handleCheckboxChange}
              />

              <Button variant="primary" onClick={handleSave}>
                Speichern
              </Button>
            </BlockStack>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
