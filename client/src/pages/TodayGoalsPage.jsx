import React from "react";
import { GoalProvider } from "../context/goalContext";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Input } from "@/components/ui/input";

import GoalsDecidePage from "../components/GoalsDecidePage";

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import GoalItem from "../components/GoalItem";

const TodayGoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState("");
  const { getToken } = useAuth();

  // Fetch token on mount
  useEffect(() => {
    fetchGoals();
  }, [getToken]);

  const fetchGoals = async () => {
    console.log("Fetching today goals");
    console.log("Fetching today goals");
    const token = await getToken();
    if (!token) {
      console.error("Authentication token not available.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/goals/today-goals",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch goals: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error(error);
      setGoals([]); // Clear goals on error to avoid showing stale data
    }
    const data = await fetch("http://localhost:3000/api/goals/today-goals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    console.log(data.data);
    setGoals(data.data);
  };

  const handleSave = async () => {
    const token = await getToken();
    if (!token) {
      console.error("Authentication token not available.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/goals/today-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goalText: goal }),
      });
      setGoal(""); // Clear input after successful save
      fetchGoals(); // Refresh the goals list
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleDelete = async (goalId) => {
    const goalToDelete = goals.find((item) => item._id === goalId);
    if (!goalToDelete) {
      console.error("Goal not found for deletion");
      return;
    }

    const token = await getToken();
    if (!token) {
      console.error("Authentication token not available.");
      return;
    }

    try {
      await fetch("http://localhost:3000/api/goals/today-goals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: goalToDelete._id,
          userId: goalToDelete.userId,
        }),
      });
      fetchGoals(); // Refresh the goals list
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  const toggleGoal = (goalId) => {
    const index = goals.findIndex((goal) => goal._id === goalId);
    console.log(index);
    goals[index].completed = !goals[index].completed;
    setGoals([...goals]); //to re-render the page so that changes becomes visible on screen
  };

  const handleAdd = () => {
    console.log("Add was clicked");
    setGoal("");
    console.log(goals);
    handleSave();
    fetchGoals();
  };

  const handleEdit = async (id, goal) => {
    // setGoals(prev => (prev.map((currentGoal) => (currentGoal._id === id) ? goal : currentGoal )))

    //patching the existing data in DB
    const token = await getToken()
    if(!token){
      console.error("Authentication token not available.");
      return;
    }

    console.log(goal)

    try {
      await fetch(`http://localhost:3000/api/goals/today-goals/${goal._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({goalText: goal.goalText}), //no need to pass userId as the _id of goal will remain same
      });
    } catch (error) {
      console.error("Failed to save the changes", error)
    }

    fetchGoals()
  };

  return (
    <GoalProvider
      value={{
        goals,
        fetchGoals,
        handleAdd,
        toggleGoal,
        handleDelete,
        handleEdit,
      }}
    >
      <GoalsDecidePage />
      <div className="w-full mt-4">
        <Card className="mb-4 w-3/4 mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Add Daily Goal</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Solve 2 DSA problems"
              className="flex-1"
              value={goal}
              onKeyDown={(e) => {
                if (goal.length >= 5 && e.key === "Enter") handleAdd();
              }}
            />
            <Button onClick={handleAdd} disabled={goal.length <= 5}>
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 w-3/4 mx-auto">
        <CardHeader>
          <CardTitle>Today's Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {goals.length === 0 && (
            <h1 className="text-3xl font-bold text-gray-900/30 dark:text-white/30 text-center">
              Add Goals for Today
            </h1>
          )}

          <motion.div layout className="flex gap-2 flex-col">
            {goals.map((goal) => (
              <div key={goal._id} className="w-full">
                <GoalItem goal={goal} />
              </div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </GoalProvider>
  );
};

export default TodayGoalsPage;
