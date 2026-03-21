import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubeIframe from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Spacing, FontSizes } from '../constants/theme';

interface Exercise {
  name: string;
  sets?: string;
  notes?: string;
  link?: string;
}

interface WorkoutDay {
  title: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  id: string;
  name: string;
  subtitle: string;
  notes?: string[];
  days: WorkoutDay[];
  additionalVideos?: { title: string; link: string }[];
}

const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'home_level2',
    name: 'Home Level 2',
    subtitle: 'Dumbbell Program',
    notes: [
      '10,000 steps daily',
      'Warm up: Deadbug, Plank, Bird Dog - 15 reps each',
      '5 min warm up + stretching before each session',
      'Rest 30-45 secs between sets, 1 min between exercises',
    ],
    days: [
      {
        title: 'Day 1 & 4 - Legs and Shoulder',
        exercises: [
          { name: 'Free Squats', sets: '3 sets x 10 reps', link: 'https://www.youtube.com/watch?v=WULoh2irC84' },
          { name: 'Weighted Squats', sets: '3 x 10 reps', link: 'https://www.youtube.com/watch?v=YqYi90vp8m4' },
          { name: 'Straight Leg Deadlift', sets: '3 x 8 reps (light)', link: 'https://www.youtube.com/watch?v=fai6L-DQ8a0' },
          { name: 'Calf Raises', sets: '5 sets x 10 reps', link: 'https://www.youtube.com/watch?v=-M4-G8p8fmc' },
          { name: 'Dumbbell Shoulder Press', sets: '4 sets x 10 reps', link: 'https://www.youtube.com/watch?v=hKm9V4EYrYs' },
          { name: 'Side Raises', sets: '3 sets x 8 reps', link: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
          { name: 'Front Raises', sets: '3 sets x 8 reps', link: 'https://www.youtube.com/watch?v=-t7fuZ0KhDA' },
          { name: 'Leg Raises', sets: '5 sets x failure', link: 'https://www.youtube.com/watch?v=Wp4BlxcFTkE' },
          { name: 'Plank', link: 'https://www.youtube.com/watch?v=pvIjsG5Svck' },
          { name: 'Glute Bridge', link: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E&t=22s' },
        ],
      },
      {
        title: 'Day 2 & 5 - Back and Arms',
        exercises: [
          { name: 'Dumbbell Rows', sets: '4 sets x 10 reps each arm', link: 'https://www.youtube.com/watch?v=pYcpY20QaE8' },
          { name: 'Dumbbell Deadlift', sets: '3 x 10 reps', link: 'https://www.youtube.com/watch?v=lJ3QwaXNJfw' },
          { name: 'Dumbbell Bicep Curls', sets: '4 sets x 8 reps', link: 'https://www.youtube.com/watch?v=sAq_ocpRh_I' },
          { name: 'Hammer Curls', sets: '4 sets x 10 reps', link: 'https://www.youtube.com/watch?v=zC3nLlEvin4' },
          { name: 'Back Dips for Tricep', sets: '3 sets x 10 reps', link: 'https://www.youtube.com/watch?v=0326dy_-CzM' },
          { name: 'Dumbbell Tricep Extension', sets: '3 x 8 reps each arm', link: 'https://www.youtube.com/watch?v=jTQWYdWLvys' },
          { name: 'Dumbbell Kickback', sets: '3 sets x 8 each arm', link: 'https://www.youtube.com/watch?v=6SS6K3lAwZ8' },
          { name: 'Plank', link: 'https://www.youtube.com/watch?v=pvIjsG5Svck' },
          { name: 'Glute Bridge', link: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E&t=22s' },
        ],
      },
      {
        title: 'Day 3 & 6 - Chest and Core',
        exercises: [
          { name: 'Dumbbell Chest Press', sets: '5 sets x 10 reps', link: 'https://www.youtube.com/watch?v=uUGDRwge4F8' },
          { name: 'Dumbbell Flys', sets: '3 sets x 8 reps', link: 'https://www.youtube.com/watch?v=f5EMDU6d9fY' },
          { name: 'Dumbbell Pullovers', sets: '3 sets x 8 reps', link: 'https://www.youtube.com/watch?v=m_Z7KFVcuHQ' },
          { name: 'Sit Ups', sets: '5 sets x failure', link: 'https://www.youtube.com/watch?v=1fbU_MkV7NE' },
          { name: 'Leg Raises', sets: '3 sets x failure', link: 'https://www.youtube.com/watch?v=JB2oyawG9KI' },
          { name: 'Dead Bug', link: 'https://www.youtube.com/watch?v=g_BYB0R-4Ws' },
          { name: 'Plank', link: 'https://www.youtube.com/watch?v=pvIjsG5Svck' },
          { name: 'Glute Bridge', link: 'https://www.youtube.com/watch?v=OUgsJ8-Vi0E&t=22s' },
        ],
      },
    ],
    additionalVideos: [
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
  {
    id: 'resistance_band',
    name: 'Resistance Band',
    subtitle: 'Full Body Band Workout',
    notes: [
      'Minimum 12,000 steps daily',
    ],
    days: [
      {
        title: 'Full Body - All Days',
        exercises: [
          { name: 'Jumping Jack', sets: '100 reps' },
          { name: 'Burpee', sets: '100 reps' },
          { name: 'Band Squat to Press', link: 'https://www.youtube.com/watch?v=kFBhPFyxGRk' },
          { name: 'Resistance/Assistance Pistol Squats', sets: '12 x 3 sets', link: 'https://www.youtube.com/watch?v=tiA23NSUm7A' },
          { name: 'Band Bent-Over Rows', link: 'https://www.youtube.com/shorts/DWl-WW3ScEM' },
          { name: 'Leg Banded Romanian Deadlifts', sets: '12 x 3 sets' },
          { name: 'Band-Resisted Plyometric Lunges', sets: '12 x 3 sets' },
          { name: 'Banded Bicep Curls with Overhead Press', sets: '12 x 3 sets' },
          { name: 'Band-Resisted Tricep Kickbacks', sets: '12 x 3 sets' },
          { name: 'Band-Resisted Reverse Flyes', sets: '12 x 3 sets' },
          { name: 'Banded Glute Bridges', sets: '12 x 3 sets' },
          { name: 'Banded Russian Twists', sets: '12 x 3 sets' },
          { name: 'Plank', sets: 'Hold till failure' },
        ],
      },
    ],
    additionalVideos: [
      { title: '2000 Steps Challenge', link: 'https://www.youtube.com/watch?v=NZeWHe1f4Io' },
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
  {
    id: 'gym_plan3',
    name: 'Gym Plan 3',
    subtitle: 'Chest / Back / Legs Split',
    notes: [
      'Warm up: Deadbug, Plank, Bird Dog - 15 reps each',
      'Cardio for 20 mins after every workout',
      'Cardio every day on empty stomach for up to 30 mins',
    ],
    days: [
      {
        title: 'Day 1 & 4 - Chest, Shoulder, Tricep',
        exercises: [
          { name: 'Weighted Push Up', link: 'https://www.youtube.com/watch?v=SYZ7ktqfL2Q' },
          { name: 'Incline Bench Press', sets: '3-4 x 8-10', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1drL-iBIG-Yd1Y2aBU3Atsj' },
          { name: 'Decline Bench Press', sets: '3-4 x 8-10' },
          { name: 'Mid Cable Crossover', sets: '3-4 x 8-10', link: 'https://www.youtube.com/watch?v=hhruLxo9yZU' },
          { name: 'Shoulder Press (Machine)', sets: '3-4 x 8-10' },
          { name: 'Cable Lateral Raise', sets: '3-4 x 8-10' },
          { name: 'Seated Front Raise', sets: '3-4 x 8-10' },
          { name: 'Shoulder Shrug', sets: '3-4 x 8-10', link: 'https://www.youtube.com/watch?v=JEnhFC1AtHw' },
          { name: 'Weighted Bench Dips', sets: '3-4 x 8-10', link: 'https://www.youtube.com/watch?v=HEeT2sbmcXc' },
          { name: 'Reverse Single Cable Extension', link: 'https://www.youtube.com/watch?v=58hvUundROk' },
          { name: 'Tricep Kickbacks', sets: '3-4 x 8-10' },
          { name: 'Russian Twist' },
          { name: 'Wood Chopper', link: 'https://www.youtube.com/watch?v=wu3WvaWmCMU' },
          { name: 'Plank' },
        ],
      },
      {
        title: 'Day 2 & 5 - Legs',
        exercises: [
          { name: 'Jump Rope', sets: '100 times' },
          { name: 'Bulgarian Split Squat', sets: '15-20 reps', link: 'https://www.youtube.com/watch?v=2C-uNgKwPLE' },
          { name: 'Barbell Squat', sets: '3-4 x 15-20', link: 'https://www.youtube.com/watch?v=nFAscG0XUNY' },
          { name: 'Dumbbell Reverse Lunges', sets: '3 x 15-20', link: 'https://www.youtube.com/watch?v=jfQCcFm7SyA' },
          { name: 'Leg Press', sets: '3-4 x 15-20', link: 'https://www.youtube.com/watch?v=xCQ-FY_bj9E' },
          { name: 'Leg Extension', sets: '15-20 reps', link: 'https://www.youtube.com/watch?v=vRQpiTwUeyM' },
          { name: 'Leg Curl', sets: '15-20 reps', link: 'https://www.youtube.com/watch?v=SbSNUXPRkc8' },
          { name: 'Adduction & Abduction', sets: '3-4 x 15-20', link: 'https://www.youtube.com/shorts/5R9qCBLlFLY' },
          { name: 'Calf Raise Seated', sets: '3-4 x 15-20', link: 'https://www.youtube.com/watch?v=JbyjNymZOt0' },
          { name: 'Calf Raise on Hack Squat Machine', sets: '15-20 reps', link: 'https://www.youtube.com/watch?v=cMALtjmyOZc' },
          { name: 'Russian Twist', sets: '15-20 reps', link: 'https://www.youtube.com/watch?v=gU-NeDmjmIc' },
          { name: 'Reverse Crunch', sets: '15-20 reps' },
          { name: 'Wood Chopper', sets: '3-4 x 15-20', link: 'https://www.youtube.com/watch?v=wu3WvaWmCMU' },
        ],
      },
      {
        title: 'Day 3 & 6 - Back and Bicep',
        exercises: [
          { name: 'Chin Up' },
          { name: 'Deadlift', link: 'https://www.youtube.com/shorts/E7NfngF5Q3o' },
          { name: 'Wide Grip Lat Pull Down', sets: '3-4 x 12-15', link: 'https://www.youtube.com/watch?v=yPqv3ejnZvc' },
          { name: 'V Bar Lat Pull Down', sets: '3-4 x 12-15', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1fd2EA8K0gb0-7YJhrWbWT_' },
          { name: 'Cable Row', sets: '3-4 x 12-15' },
          { name: 'Face Pull', sets: '3-4 x 12-15' },
          { name: 'Dumbbell Hammer Curl', sets: '3-4 x 12-15', link: 'https://www.youtube.com/watch?v=RIEMoYL_h1Y' },
          { name: 'Cable Bicep Curl', sets: '3-4 x 12-15', link: 'https://www.youtube.com/watch?v=UsaY33N4KEw' },
          { name: 'Zotman Curl', sets: 'Until failure' },
          { name: 'Reverse Curl' },
          { name: 'Preacher Curl', sets: '3-4 x 12-15' },
          { name: 'Concentration Curl', link: 'https://www.youtube.com/watch?v=0AUGkch3tzc&t=43s' },
          { name: 'Wrist Curl', link: 'https://www.youtube.com/watch?v=7ac_qmBjkFI' },
          { name: 'Reverse Wrist Curl', sets: '3-4 x 12-15', link: 'https://www.youtube.com/watch?v=osYPwlBiCRM' },
          { name: 'Hanging Leg Raises' },
        ],
      },
    ],
    additionalVideos: [
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
  {
    id: 'gym_workout',
    name: 'Gym Workout',
    subtitle: 'Advanced Dumbbell / Cable Split',
    notes: [
      'Warm up: Deadbug, Plank, Bird Dog - 15 reps each',
      'Cardio for 20 mins after every workout',
      'Cardio every day on empty stomach for up to 30 mins',
    ],
    days: [
      {
        title: 'Day 1 & 4 - Chest, Shoulder, Tricep',
        exercises: [
          { name: 'Decline Dumbbell Press', sets: '3-4 x 8-10', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1drL-iBIG-Yd1Y2aBU3Atsj' },
          { name: 'Incline Dumbbell Bench Press', sets: '3-4 x 8-10' },
          { name: 'Cable Crossover', sets: '3-4 x 8-10' },
          { name: 'Shoulder Press', sets: '3-4 x 8-10' },
          { name: 'Cable Lateral Raise', sets: '3-4 x 8-10' },
          { name: 'Cable Front Raise', sets: '3-4 x 8-10' },
          { name: 'Skull Crusher', sets: '3-4 x 8-10' },
          { name: 'Cable Tricep Push Down', sets: '3-4 x 8-10' },
          { name: 'Tricep Kickbacks', link: 'https://www.youtube.com/shorts/3Bv1n7-DN7c' },
          { name: 'Flat Bench Lying Leg Raise', sets: '3-4 x 8-10' },
          { name: 'Plank', sets: 'Until failure' },
          { name: 'Russian Twists', sets: 'Until failure' },
          { name: 'Reverse Crunch', sets: 'Until failure' },
        ],
      },
      {
        title: 'Day 2 & 5 - Legs',
        exercises: [
          { name: 'Goblet Squat', sets: '3-4 x 12-15' },
          { name: 'Free Lunges', sets: '3 x 15' },
          { name: 'Stiff Leg Deadlift', sets: '3-4 x 12-15', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1cSFqXuabDOZVkJsgeL3mOA' },
          { name: 'Leg Press', sets: '3-4 x 12-15' },
          { name: 'Adduction', sets: '3-4 x 12-15' },
          { name: 'Calf Raise', sets: '3-4 x 12-15' },
          { name: 'Hanging Leg Raise', sets: '3-4 x 12-15' },
          { name: 'Decline Crunches', sets: '5 sets (failure)' },
          { name: 'Russian Twists' },
          { name: 'Leg Raises', sets: '5 sets (failure)' },
        ],
      },
      {
        title: 'Day 3 & 6 - Back and Bicep',
        exercises: [
          { name: 'Wide Grip Lat Pull Down', sets: '3-4 x 12-15' },
          { name: 'V Bar Lat Pull Down', sets: '3-4 x 12-15', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1fd2EA8K0gb0-7YJhrWbWT_' },
          { name: 'Cable Row', sets: '3-4 x 12-15' },
          { name: 'Face Pull', sets: '3-4 x 12-15' },
          { name: 'Standing Alternate Hammer Curls', sets: '3-4 x 12-15' },
          { name: 'Cable Bicep Curl', sets: '3-4 x 12-15' },
          { name: 'Zotman Curl', sets: 'Until failure' },
          { name: 'Reverse Curl' },
          { name: 'Preacher Curl', sets: '3-4 x 12-15' },
          { name: 'Concentration Curl', link: 'https://www.youtube.com/watch?v=0AUGkch3tzc&t=43s' },
          { name: 'Plank' },
          { name: 'Crunches', sets: '3-4 x 12-15' },
        ],
      },
    ],
    additionalVideos: [
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
  {
    id: 'home_workout',
    name: 'Home Workout',
    subtitle: 'Resistance Tube Program',
    notes: [
      'Minimum 12,000 steps daily',
      '1 rest day per week',
    ],
    days: [
      {
        title: 'Full Body (Resistance Tube) - 20-25 reps x 3',
        exercises: [
          { name: 'Jumping Jack', sets: '20-25 x 3', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1cAWsxLeouK40pczT1yWEYG' },
          { name: 'Push Up', sets: '20-25 x 3' },
          { name: 'Resistance Tube Squat', sets: '20-25 x 3' },
          { name: 'Bicep Curl', sets: '20-25 x 3' },
          { name: 'Tricep Extension', sets: '20-25 x 3' },
          { name: 'Lateral Raises', sets: '20-25 x 3' },
          { name: 'Leg Press', sets: '20-25 x 3' },
          { name: 'Lunges', sets: '20-25 x 3' },
          { name: 'Calf Raise', sets: '20-25 x 3' },
          { name: 'Crunches', sets: '20-25 x 3' },
          { name: 'Russian Twists', sets: '20-25 x 3' },
          { name: 'Plank', sets: 'Hold x 3 sets' },
          { name: 'Side Plank', sets: 'Hold x 3 sets' },
        ],
      },
      {
        title: 'Any 5 Day - Beginner Full Body',
        exercises: [
          { name: 'Steps (8k goal)', link: 'https://www.youtube.com/playlist?list=PLvqNQmL5df1d7QPHJ65YQygDbULSwJvEF' },
          { name: 'Modified Jumping Jack (no jumping)', sets: '30 x 3 sets' },
          { name: 'Push Up', sets: '10 x 3 sets' },
          { name: 'Squat Hold', sets: '45-60 sec x 3 sets' },
          { name: 'Plank', sets: '45-60 sec x 3 sets' },
          { name: 'Stretching' },
        ],
      },
    ],
    additionalVideos: [
      { title: '2000 Steps Challenge', link: 'https://www.youtube.com/watch?v=NZeWHe1f4Io' },
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
  {
    id: 'new_plan',
    name: 'New Plan',
    subtitle: 'Push / Pull / Leg Split',
    notes: [
      'Schedule: PUSH - PULL - LEG - REST - PUSH - PULL - LEG - REST',
      '4 sets x 12-15 reps unless otherwise noted',
    ],
    days: [
      {
        title: 'Push Day - Chest, Shoulder, Tricep',
        exercises: [
          { name: 'Push Up', sets: '15 reps x 4 sets' },
          { name: 'Bench Press', sets: '4 sets' },
          { name: 'Incline Dumbbell Bench Press', sets: '4 sets' },
          { name: 'Cable Fly', sets: '4 sets' },
          { name: 'Dumbbell Shoulder Press', sets: '4 sets' },
          { name: 'Cable Overhead Tricep Extension', sets: '4 sets' },
          { name: 'Bentover Single Arm Cable Kickback', sets: '4 sets' },
          { name: 'V Bar Pushdown', sets: '4 sets' },
          { name: 'Tricep Dips', sets: '4 x 15 reps' },
          { name: 'Plank (Core)', sets: '3 sets - hold' },
        ],
      },
      {
        title: 'Pull Day - Back and Bicep',
        exercises: [
          { name: 'Pull Up', sets: '4 sets' },
          { name: 'Barbell Rows', sets: '4 sets' },
          { name: 'Pull Over', sets: '4 sets' },
          { name: 'Lat Pull Down', sets: '4 sets' },
          { name: 'Seated Cable Rowing', sets: '3 sets' },
          { name: 'Cable Bicep Curl', sets: '4 sets' },
          { name: 'Cable Hammer Curls', sets: '4 sets' },
          { name: 'Dumbbell Concentration Curl', sets: '4 sets' },
          { name: 'Barbell Preacher Curl', sets: '4 sets' },
          { name: 'Hanging Leg Raise & Cable Woodchop', sets: '15 each' },
        ],
      },
      {
        title: 'Leg Day - Quads, Hamstrings, Calves, Core',
        exercises: [
          { name: 'Leg Press', sets: '5 sets' },
          { name: 'Reverse Lunges', sets: '3 sets' },
          { name: 'Hack Squats', sets: '3 sets' },
          { name: 'Leg Extension', sets: '3 sets' },
          { name: 'Leg Curls', sets: '4 sets' },
          { name: 'Straight Leg Deadlift', sets: '5 sets' },
          { name: 'Calf Raise', sets: '5 x 15 reps' },
          { name: 'Plank', sets: '3 sets' },
          { name: 'Side Plank (both sides)', sets: '3 sets each side' },
        ],
      },
    ],
    additionalVideos: [
      { title: 'Pre-Workout', link: 'https://youtu.be/sTxC3J3gQEU' },
      { title: 'Post-Workout', link: 'https://youtu.be/IVt1KqKcYZk' },
      { title: 'Flexibility & Mobility', link: 'https://youtu.be/nFo5dOhlYUw' },
      { title: 'Abs Circuit', link: 'https://youtu.be/uUKAYkQZXko' },
    ],
  },
];

export default function WorkoutPlansScreen({ navigation }: any) {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('home_level2');
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const selectedPlan = WORKOUT_PLANS.find(p => p.id === selectedPlanId)!;

  const getVideoId = (url: string): string | null => {
    if (!url || url.includes('playlist?list=')) return null;
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return shortsMatch[1];
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];
    return null;
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setExpandedDay(0);
    setPlayingVideo(null);
  };

  const toggleDay = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
    setPlayingVideo(null);
  };

  const toggleVideo = (key: string) => {
    setPlayingVideo(playingVideo === key ? null : key);
  };

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.workoutPlans}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Plan Tab Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScrollView}
        contentContainerStyle={styles.tabContainer}
      >
        {WORKOUT_PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.tabButton,
              { borderColor: colors.primary },
              selectedPlanId === plan.id && { backgroundColor: colors.primary },
            ]}
            onPress={() => handlePlanSelect(plan.id)}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: selectedPlanId === plan.id ? '#fff' : colors.primary },
              ]}
              numberOfLines={1}
            >
              {plan.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Plan Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Plan Badge */}
        <View style={[styles.planBadge, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.planBadgeText, { color: colors.primary }]}>{selectedPlan.subtitle}</Text>
        </View>

        {/* Workout Days */}
        {selectedPlan.days.map((day, dayIndex) => (
          <View
            key={dayIndex}
            style={[styles.dayCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <TouchableOpacity
              style={styles.dayHeader}
              onPress={() => toggleDay(dayIndex)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayTitle, { color: colors.text }]}>{day.title}</Text>
              <Ionicons
                name={expandedDay === dayIndex ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {expandedDay === dayIndex && (
              <View style={styles.exerciseList}>
                {day.exercises.map((exercise, exIndex) => {
                  const videoKey = `${selectedPlanId}-${dayIndex}-${exIndex}`;
                  const isPlaying = playingVideo === videoKey;
                  const videoId = exercise.link ? getVideoId(exercise.link) : null;
                  const canEmbed = videoId !== null;

                  return (
                    <View key={exIndex}>
                      <View style={[styles.exerciseRow, { borderBottomColor: colors.border }]}>
                        <View style={styles.exerciseInfo}>
                          <Text style={[styles.exerciseName, { color: colors.text }]}>
                            {exercise.name}
                          </Text>
                          {exercise.sets ? (
                            <Text style={[styles.exerciseMeta, { color: colors.textSecondary }]}>
                              {exercise.sets}
                            </Text>
                          ) : null}
                          {exercise.notes ? (
                            <Text style={[styles.exerciseNoteText, { color: colors.textSecondary }]}>
                              {exercise.notes}
                            </Text>
                          ) : null}
                        </View>
                        {exercise.link && canEmbed ? (
                          <TouchableOpacity
                            style={[
                              styles.playButton,
                              { backgroundColor: isPlaying ? '#e53935' : colors.primary },
                            ]}
                            onPress={() => toggleVideo(videoKey)}
                          >
                            <Ionicons
                              name={isPlaying ? 'stop' : 'play'}
                              size={14}
                              color="#fff"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                      {isPlaying && videoId ? (
                        <View style={styles.videoContainer}>
                          <YoutubeIframe
                            height={240}
                            videoId={videoId}
                            play={true}
                            webViewStyle={{ opacity: 0.99 }}
                            webViewProps={{ allowsFullscreenVideo: true }}
                          />
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        ))}

        {/* Notes */}
        {selectedPlan.notes && selectedPlan.notes.length > 0 ? (
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.wpNotesTitle}</Text>
            {selectedPlan.notes.map((note, i) => (
              <View key={i} style={styles.noteRow}>
                <Text style={[styles.noteBullet, { color: colors.primary }]}>{'•'}</Text>
                <Text style={[styles.noteText, { color: colors.textSecondary }]}>{note}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Additional Resources */}
        {selectedPlan.additionalVideos && selectedPlan.additionalVideos.length > 0 ? (
          <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.wpAdditionalResourcesTitle}</Text>
            {selectedPlan.additionalVideos.map((video, vIndex) => {
              const additionalKey = `additional-${selectedPlanId}-${vIndex}`;
              const isPlaying = playingVideo === additionalKey;
              const videoId = getVideoId(video.link);

              return (
                <View key={vIndex}>
                  <TouchableOpacity
                    style={[
                      styles.resourceButton,
                      {
                        backgroundColor: colors.primary + '15',
                        borderColor: colors.primary + '40',
                      },
                    ]}
                    onPress={() => videoId ? toggleVideo(additionalKey) : null}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isPlaying ? 'stop-circle' : 'play-circle'}
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={[styles.resourceText, { color: colors.text }]}>{video.title}</Text>
                    {!videoId ? (
                      <Ionicons name="open-outline" size={16} color={colors.textSecondary} />
                    ) : null}
                  </TouchableOpacity>
                  {isPlaying && videoId ? (
                    <View style={styles.videoContainer}>
                      <YoutubeIframe
                        height={240}
                        videoId={videoId}
                        play={true}
                        webViewStyle={{ opacity: 0.99 }}
                        webViewProps={{ allowsFullscreenVideo: true }}
                      />
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: any) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: FontSizes.xl,
      fontWeight: '700',
    },
    tabScrollView: {
      maxHeight: 52,
      paddingVertical: 4,
    },
    tabContainer: {
      paddingHorizontal: Spacing.md,
      gap: 8,
      alignItems: 'center',
    },
    tabButton: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1.5,
      minWidth: 80,
      alignItems: 'center',
    },
    tabButtonText: {
      fontSize: FontSizes.sm,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.md,
      paddingTop: Spacing.sm,
    },
    planBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: Spacing.md,
    },
    planBadgeText: {
      fontSize: FontSizes.sm,
      fontWeight: '600',
    },
    dayCard: {
      borderRadius: 12,
      borderWidth: 1,
      marginBottom: Spacing.sm,
      overflow: 'hidden',
    },
    dayHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: Spacing.md,
    },
    dayTitle: {
      fontSize: FontSizes.md,
      fontWeight: '600',
      flex: 1,
      marginRight: 8,
    },
    exerciseList: {
      paddingBottom: 4,
    },
    exerciseRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.md,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
    },
    exerciseInfo: {
      flex: 1,
      marginRight: 8,
    },
    exerciseName: {
      fontSize: FontSizes.sm,
      fontWeight: '500',
    },
    exerciseMeta: {
      fontSize: FontSizes.xs,
      marginTop: 2,
    },
    exerciseNoteText: {
      fontSize: FontSizes.xs,
      fontStyle: 'italic',
      marginTop: 2,
    },
    playButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoContainer: {
      height: 240,
      backgroundColor: '#000',
    },
    webview: {
      flex: 1,
    },
    infoCard: {
      borderRadius: 12,
      borderWidth: 1,
      padding: Spacing.md,
      marginTop: Spacing.sm,
      marginBottom: Spacing.sm,
    },
    sectionTitle: {
      fontSize: FontSizes.md,
      fontWeight: '700',
      marginBottom: Spacing.sm,
    },
    noteRow: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    noteBullet: {
      fontSize: FontSizes.sm,
      marginRight: 8,
      lineHeight: 20,
    },
    noteText: {
      fontSize: FontSizes.sm,
      flex: 1,
      lineHeight: 20,
    },
    resourceButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: Spacing.sm,
      borderRadius: 8,
      borderWidth: 1,
      marginBottom: 8,
      gap: 8,
    },
    resourceText: {
      fontSize: FontSizes.sm,
      fontWeight: '500',
      flex: 1,
    },
  });
}
