"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function TestDBPage() {
  const [users, setUsers] = useState<any[]>([])
  const [profiles, setProfiles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    setLoading(true)
    setError("")

    try {
      // Test user profiles
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (profileError) {
        setError(`Profile error: ${profileError.message}`)
      } else {
        setProfiles(profileData || [])
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    setError("")

    try {
      const { data, error } = await supabase.from("user_profiles").select("count(*)").single()

      if (error) {
        setError(`Connection error: ${error.message}`)
      } else {
        setError(`Connection successful! Found ${data?.count || 0} profiles`)
      }
    } catch (err) {
      setError(`Connection failed: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const testCurrentUser = async () => {
    setLoading(true)
    setError("")

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        setError(`User error: ${userError.message}`)
        return
      }

      if (!user) {
        setError("No user logged in")
        return
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        setError(`Profile fetch error: ${profileError.message}`)
      } else {
        setError(`Current user profile found! Phone: ${profile?.phone || "Not set"}`)
        console.log("Current user profile:", profile)
        console.log("Current user metadata:", user.user_metadata)
      }
    } catch (err) {
      setError(`Unexpected error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Database Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={testConnection} disabled={loading}>
              Test Connection
            </Button>
            <Button onClick={fetchUsers} disabled={loading}>
              Refresh Data
            </Button>
            <Button onClick={testCurrentUser} disabled={loading}>
              Check Current User
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-2">User Profiles ({profiles.length})</h3>
            {profiles.length > 0 ? (
              <div className="space-y-2">
                {profiles.map((profile) => (
                  <div key={profile.id} className="p-3 border rounded-md">
                    <p>
                      <strong>Name:</strong> {profile.first_name} {profile.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email || "Not available"}
                    </p>
                    <p>
                      <strong>Phone:</strong> {profile.phone || "Not set"}
                    </p>
                    <p>
                      <strong>Country:</strong> {profile.country}
                    </p>
                    <p>
                      <strong>University:</strong> {profile.university}
                    </p>
                    <p>
                      <strong>Major:</strong> {profile.major}
                    </p>
                    <p>
                      <strong>Level:</strong> {profile.study_level}
                    </p>
                    <p>
                      <strong>Created:</strong> {new Date(profile.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No user profiles found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
