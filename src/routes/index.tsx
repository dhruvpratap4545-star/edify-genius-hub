import { createFileRoute } from '@tanstack/react-router';
import { QuizEngine } from '../components/QuizEngine';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Daily Quiz Section */}
      <QuizEngine />
    </div>
  );
}
