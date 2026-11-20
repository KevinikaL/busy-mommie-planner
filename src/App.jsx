// Import styling, the useTable hook, and Supabase connection.
import { useState } from 'react'
import './App.css'
import { useTable } from './useTable'
import { supabase } from './utils/supabase'

// Main component for the Busy Mommie Planner.
function App() {
  // Get scheduled tasks from Supabase and manage loading and errors.
   const { data, error, loading, reload } = useTable('weekly_daily_planner')

   // Use state to remember which day the user selects.
   const [selectedDay, setSelectedDay] = useState('Monday')

   // Use state to switch between the welcome screen and planner.
  const [showPlanner, setShowPlanner] = useState(false)

  // Store all 24 hours in an array to display the daily schedule.
   const hours = [
  '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM',
  '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM',
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
  ]


   // Handle form submission and save a new task to Supabase.
   const addTask = async (event) => {

    // Prevent the page from refreshing when the form is submitted.
    event.preventDefault()

     const form = event.target
     // Collect the task information entered into the form.
     const newTask = {
      times: form.elements.namedItem('times').value,
      days: form.elements.namedItem('days').value,
      category: form.elements.namedItem('category').value,
      task: form.elements.namedItem('task').value,
      names: form.elements.namedItem('names').value
    }
     // Insert the new task into the weekly_daily_planner table.
     const { error } = await supabase
      .from('weekly_daily_planner')
      .insert([newTask])
   // Show an error message if the task cannot be saved.
   if (error) {
    alert('Unable to add task.')
    console.error(error)
    return
  }

  // Clear the form and refresh the task list after saving.
    form.reset()
    reload()
  }
  // Delete a selected task from Supabase using its unique ID.
  const deleteTask = async (id) => {
  const { error } = await supabase
    .from('weekly_daily_planner')
    .delete()
    .eq('id', id)

   // Display an error if the selected task cannot be deleted.
  if (error) {
    alert('Unable to delete task.')
    console.error(error)
    return
  }

  reload()
}

  // Display a loading message while tasks are being fetched.
  if (loading) {
    return <p>Loading schedule...</p>
  }

   // Display an error message if tasks cannot be loaded.
   if (error) {
    return <p>Unable to load tasks.</p>
  }

  // Display the planner's form and scheduled tasks.
  return (
  <>
    {!showPlanner ? (
      <div className="welcome-screen">
        <div className="welcome-content">
          <h1>Busy Mommie Planner</h1>
          <h2>Welcome to Your Family Planner</h2>
          <p>Organize your family, one day at a time.</p>

          <button onClick={() => setShowPlanner(true)}>
            Open Planner
          </button>
        </div>
      </div>
    ) : (
      <main>
        
      <h1>Busy Mommie Planner</h1>
      <h2>My Family Schedule</h2>

      <h3>Add Task</h3>

       {/* Form for entering a new task with time, day, category, and name. */}
       <form onSubmit={addTask}>
        
       {/* Let users select a time from the 24-hour schedule. */}
      <select name="times" required defaultValue="">
        <option value="" disabled>Select a time</option>

       {hours.map((hour) => (
        <option key={hour} value={hour}> {hour} </option>
       ))}
      </select>

        
        <select name="days" required defaultValue="">
          <option value="" disabled>Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <select name="category" required defaultValue="">
          <option value="" disabled>Select a category</option>
          <option value="School">School</option>
          <option value="Household">Household</option>
          <option value="Family">Family</option>
          <option value="Errands">Errands</option>
          <option value="Personal">Personal</option>
        </select>

         <input
          name="task"
          type="text"
          placeholder="Enter task"
          required
        />

         <input
          name="names"
          type="text"
          placeholder="Family member's name"
          required
        />

        <button type="submit">Add Task</button>
      </form>

      
{/* Choose a day */}
<h3>My Weekly Schedule</h3>

<select
  value={selectedDay}
  onChange={(event) => setSelectedDay(event.target.value)}
>
  <option>Monday</option>
  <option>Tuesday</option>
  <option>Wednesday</option>
  <option>Thursday</option>
  <option>Friday</option>
  <option>Saturday</option>
  <option>Sunday</option>
</select>

<h3>{selectedDay}'s Schedule</h3>

   {/* Display the selected day's tasks in a 24-hour schedule. */}
   <div className="table-container">
    <table>
      <thead>
       <tr>
        <th>Time</th>
        <th>Category</th>
        <th>Event</th>
        <th>Name</th>
       </tr>
     </thead>
 
    <tbody>
      {hours.map((hour) => {
        const hourTasks = data.filter(
          (item) =>
            item.days === selectedDay &&
            item.times === hour
        )

        return (
          <tr key={hour}>
            <td>{hour}</td>

            <td>
            {hourTasks.map((item) => (
              <p key={item.id} className={item.category}>{item.category} </p>
            ))}
           </td>

            <td>
              {hourTasks.map((item) => (
                <div key={item.id}>
                  <p>{item.task}</p>
                  <button onClick={() => deleteTask(item.id)} >Delete  </button>
                </div>
              ))}
            </td>

            <td>
              {hourTasks.map((item) => (
                <p key={item.id}>{item.names}</p>
              ))}
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
</div>
      {/* Return to the Welcome Page */}
     <button onClick={() => setShowPlanner(false)}> Home</button>
    </main>
  )}
  </>
  )
    
}

export default App
