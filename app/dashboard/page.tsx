export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Meine Spiele</h2>
          <p className="text-muted-foreground mb-4">
            Keine aktiven Spiele
          </p>
          <p className="text-sm text-muted-foreground">
            Erstelle ein neues Spiel um zu starten
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Statistiken</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spiele gespielt:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Spiele gewonnen:</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-2">Schnellstart</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Bereit loszulegen?
          </p>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Neues Spiel
            </button>
            <button className="w-full px-4 py-2 border rounded-md hover:bg-accent">
              Spiel beitreten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
