import { useEffect, useState } from 'react'
import { supabase } from './utils/supabase'

export function useTable(table) {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    async function loadData() {
      setLoading(true)

      const { data, error } = await supabase
        .from(table)
        .select()

      setData(data ?? [])
      setError(error)
      setLoading(false)
    }

    loadData()
  }, [table, refresh])

  function reload() {
    setRefresh(value => value + 1)
  }

  return { data, error, loading, reload }
}
