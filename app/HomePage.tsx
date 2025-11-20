import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Sternenhaus
        </h1>
        <p className="text-xl text-muted-foreground mb-4 max-w-2xl">
          Ein KI-gesteuertes Handelssimulationsspiel, das die Tiefe klassischer
          Wirtschaftssimulationen mit moderner KI-Erzählkunst vereint.
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Inspiriert von Dune und der Fugger-Reihe erschaffen wir ein lebendiges
          Universum, in dem jede Entscheidung zählt.
        </p>

        <div className="flex gap-4">
          <Link href="/login">
            <Button size="lg">Jetzt spielen</Button>
          </Link>
          <Link href="https://github.com/denfu80/smartyparty" target="_blank">
            <Button size="lg" variant="outline">GitHub</Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">KI-gesteuerte NPCs</h3>
            <p className="text-muted-foreground">
              Dynamische Charaktere mit eigenem Gedächtnis und Persönlichkeit
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Komplexe Wirtschaft</h3>
            <p className="text-muted-foreground">
              Handel, Diplomatie und strategische Entscheidungen
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Emergente Stories</h3>
            <p className="text-muted-foreground">
              Einzigartige Geschichten die sich aus deinen Handlungen entwickeln
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
