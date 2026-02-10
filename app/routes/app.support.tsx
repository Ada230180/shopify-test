import {
  Button,
  Page,
  Layout,
  TextField,
  Banner,
  Select,
  Checkbox,
  Card, // <--- NEU: Für den weißen Kasten
  BlockStack, // <--- NEU: Für Abstände im Kasten
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export default function SupportPage() {
  const [selected, setSelected] = useState("Normal");
  const [value, setValue] = useState("Liebe/r Kunde/in");
  const [checked, setChecked] = useState(false);

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );
  const handleTextFieldChange = useCallback(
    (value: string) => setValue(value),
    [],
  );
  const handleCheckboxChange = useCallback(
    (value: boolean) => setChecked(value),
    [],
  );

  const options = [
    { label: "Normal", value: "normal" },
    { label: "Hoch", value: "hoch" },
    { label: "Dringend", value: "dringend" },
  ];

  return (
    <Page title="Support">
      <Layout>
        <Layout.Section>
          {/* Banner für Info ganz oben */}
          <Banner title="Support System" tone="info">
            Das Support-System ist aktuell aktiv
          </Banner>
        </Layout.Section>

        {/* Alles Folgende gehört zusammen in EINE Sektion */}
        <Layout.AnnotatedSection
          title="Kontakt-Optionen"
          description="Lege fest, wie Kunden dich kontaktieren können."
        >
          {/* Hier beginnt der weiße Kasten */}
          <Card>
            {/* BlockStack sorgt für schöne Abstände zwischen den Feldern */}
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

              {/* Button rechtsbündig oder volle Breite? Hier mal volle Breite */}
              <Button variant="primary" onClick={() => alert("Gespeichert!")}>
                Speichern
              </Button>
            </BlockStack>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}
