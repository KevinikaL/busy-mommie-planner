import './App.css'
import { useTable } from './useTable'

function App() {
   const { data, error, loading } = useTable('weekly_daily_planner')

   if (loading) {
    return <p>Loading schedule...</p>
  }

  if (error) {
    return <p>Unable to load tasks.</p>
  }

  return (
    <main>
      <h1>Busy Mommie Planner</h1>
      <h2>My Family Schedule</h2>

      {data.length === 0 ? (
        <p>No tasks scheduled.</p>
      ) : (
        data.map((item) => (
          <div key={item.id}>
            <h3>{item.task}</h3>
            <p>Time: {item.times}</p>
            <p>Day: {item.days}</p>
            <p>Category: {item.category}</p>
            <p>Name: {item.names}</p>
          </div>
        ))
      )}
    </main>
  )
    
}

export default App
