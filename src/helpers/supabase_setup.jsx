import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ngaxtqtjphtkyssalygr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYXh0cXRqcGh0a3lzc2FseWdyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODM4NjI4MywiZXhwIjoyMDAzOTYyMjgzfQ.xeYb9sOv7xv0IsOjEoKj9vTyUxi3K29PHjsHj00HJRU");

export default supabase;