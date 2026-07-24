import { Booking } from "../types";
import { supabase } from "./supabase";

const BOOKINGS_STORAGE_KEY = "brew_haven_bookings";

export function loadStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : [];
  } catch (error) {
    console.error("Failed to read stored bookings:", error);
    return [];
  }
}

export function saveStoredBookings(bookings: Booking[]): boolean {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    return true;
  } catch (error) {
    console.error("Failed to save bookings locally:", error);
    return false;
  }
}

export async function persistBooking(booking: Booking): Promise<boolean> {
  const storedBookings = loadStoredBookings();
  const updatedBookings = [booking, ...storedBookings];

  const persistedLocally = saveStoredBookings(updatedBookings);
  if (!persistedLocally) {
    return false;
  }

  const hasSupabaseConfig = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  if (!hasSupabaseConfig || !supabase) {
    return true;
  }

  try {
    const { error } = await supabase.from("bookings").insert([
      {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        guests: booking.guests,
        seating: booking.seating,
        booking_date: booking.date,
        booking_time: booking.time,
        message: booking.notes ?? "",
        created_at: booking.createdAt,
      },
    ]);

    if (error) {
      console.warn("Supabase booking sync failed; booking was saved locally.", error);
    }
  } catch (error) {
    console.warn("Supabase booking sync failed; booking was saved locally.", error);
  }

  return true;
}
