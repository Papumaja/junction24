import SwipeCardBase from '../components/SwipeCard/SwipeCardBase';
import EmployeeNavigation from '../components/EmployeeNavigation';

export default function SwipePage() {
  return (
    <div>
      <div className="content">
        <SwipeCardBase />
      </div>
      <EmployeeNavigation value={0} />
    </div>
  );
}
