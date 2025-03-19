import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/custom';

function App() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center">
            <Button>Click me</Button>
            <div className="flex items-center gap-2">
                <ModeToggle />
            </div>
        </div>
    );
}

export default App;
