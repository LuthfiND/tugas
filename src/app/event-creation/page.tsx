"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
// Ganti import ini sesuai dengan hooks redux/context auth Anda
import { useAppSelector } from "@/store/hooks";

export default function CreateEventPage() {
  const router = useRouter();
  // Ambil userId dari state auth (ganti sesuai struktur state Anda)
  const auth = useAppSelector((state) => state.auth);
  const userId = auth.id; // Mengakses id langsung dari auth
  console.log("auth", auth);

  const [form, setForm] = useState({
    title: "",
    isFree: false,
    price: "",
    start_date: "",
    end_date: "",
    limit: "",
    description: "",
    ticketType: "",
    address: "",
    category: "",
    location: "",
    time: "",
    thumbnail: null as File | null,
    promo: {
      code: "",
      discount: "",
      promo_start: "",
      promo_end: "",
    },
  });
  const [showPromo, setShowPromo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "isFree") {
      setForm({
        ...form,
        isFree: (e.target as HTMLInputElement).checked,
        price: (e.target as HTMLInputElement).checked ? "0" : "",
      });
    } else if (name === "thumbnail") {
      setForm({
        ...form,
        thumbnail: (e.target as HTMLInputElement).files?.[0] || null,
      });
    } else if (name.startsWith("promo.")) {
      setForm({
        ...form,
        promo: {
          ...form.promo,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!userId) {
      setError("User tidak ditemukan. Silakan login ulang.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("userId", String(userId));
      formData.append("isFree", String(form.isFree));
      formData.append("price", form.isFree ? "0" : form.price);
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);
      formData.append("limit", form.limit);
      formData.append("description", form.description);
      formData.append("ticketType", form.ticketType);
      formData.append("address", form.address);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("time", form.time);

      if (form.thumbnail) {
        formData.append("thumbnail_url", form.thumbnail);
      }
      if (showPromo) {
        formData.append("voucherCode", form.promo.code);
        formData.append("voucherAmount", form.promo.discount);
        formData.append("voucherExpDate", form.promo.promo_end);
        formData.append("voucherLimit", "100");
      }
      await axios.post("/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err?.message || "Failed to create event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Event Name</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleChange}
              className="mr-2"
            />
            Free Event
          </Label>
        </div>
        {!form.isFree && (
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required={!form.isFree}
              min={0}
            />
          </div>
        )}
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            name="start_date"
            type="date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            name="end_date"
            type="date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="limit">Available Seats</Label>
          <Input
            id="limit"
            name="limit"
            type="number"
            value={form.limit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            className="w-full border rounded p-2"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="ticketType">Ticket Type</Label>
          <Input
            id="ticketType"
            name="ticketType"
            value={form.ticketType}
            onChange={handleChange}
            placeholder="e.g. Regular, VIP"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="thumbnail">Event Thumbnail</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPromo(!showPromo)}
          >
            {showPromo ? "Remove Promotion" : "Add Promotion"}
          </Button>
        </div>
        {showPromo && (
          <div className="border rounded p-4 bg-gray-50">
            <h2 className="font-semibold mb-2">Promotion</h2>
            <div>
              <Label htmlFor="promo.code">Voucher Code</Label>
              <Input
                id="promo.code"
                name="promo.code"
                value={form.promo.code}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="promo.discount">Discount (%)</Label>
              <Input
                id="promo.discount"
                name="promo.discount"
                type="number"
                value={form.promo.discount}
                onChange={handleChange}
                min={1}
                max={100}
              />
            </div>
            <div>
              <Label htmlFor="promo.promo_start">Promo Start Date</Label>
              <Input
                id="promo.promo_start"
                name="promo.promo_start"
                type="date"
                value={form.promo.promo_start}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="promo.promo_end">Promo End Date</Label>
              <Input
                id="promo.promo_end"
                name="promo.promo_end"
                type="date"
                value={form.promo.promo_end}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </Button>
      </form>
    </div>
  );
}
