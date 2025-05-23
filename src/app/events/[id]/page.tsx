'use client'
import React from "react";
import { Event, MoreInformation, ShareSocialMedia } from "@/lib/types"
import { RootState, AppDispatch } from '@/lib/store';
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import { fetchEventsDetails, postTransaction } from "@/store/slices/EventsSlice";
import { Facebook, Instagram, MapPin, Twitter ,CalendarCheck, UserRound, TriangleAlert, Ban, Minus, Plus} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetchCoupons } from "@/store/slices/CouponSlice";
import { useRouter } from "next/navigation";


const ShareToSocialMedia : ShareSocialMedia[] = [
    {
        Image : Instagram,
        link : 'https://instagram.com'
    },
    {
        Image : Twitter,
        link : 'https://x.com'
    },
    {
        Image : Facebook,
        link : 'https://facebook.com'
    }
]
const information : MoreInformation[] = [
    {
        Image : UserRound,
        text: 'Audience',
        desc : "This concert is suitable for audience aged 12  and above"
    }, 
    {
        Image : TriangleAlert,
        text : 'Attention',
        desc : 'Face masks and social distancing are mandatory at the concert.'
    }, 
  {
    Image: Ban,
    text: 'Prohibited Items',
    desc: 'Outside food, professional cameras, and large bags are not allowed inside the venue.'
}
]
const EventDetailPage =  ({ params }: { params: Promise<{ id: string }> }) => {
      const { id } = use(params);
      const dispatch = useDispatch<AppDispatch>();
      const [quantity,setQuantity] = useState<number> (1)
      const [checked, setChecked] = useState(false);
      const [voucher,setVoucher] = useState <string | null>(null)
      const [message,setMessage] = useState<string | null >(null)
      const [valid,setValid] = useState(false)
      const decrease = () => {
     if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const router = useRouter()

   const increase = () => {
     setQuantity(prev => prev + 1);
    };
      const { item: events, loading } = useSelector((state: RootState & { events: { eventDetail: { item: Event; loading: boolean } } }) => state.events.eventDetail);
            const { coupons } = useSelector((state: RootState) => state.coupon);

      useEffect(()=> {
    dispatch(fetchEventsDetails(id))
      },[id,dispatch])
      const handleTransaction = async () => {
        const isUseCoupon = coupons?.code !== undefined
        console.log(coupons?.code)
        const isUseVoucher = voucher === events.Voucher?.[0]?.code
       const response = await dispatch(postTransaction({ eventId: events?.id, qty: quantity, isPointUse: false, isUseCoupon: isUseCoupon, userCouponId: isUseCoupon ? coupons?.id ?? null : null, isUseVoucher: isUseVoucher, userVoucherId: isUseVoucher ?  events?.Voucher?.[0]?.id : null })).unwrap()
       console.log(response.data.data.id,'response')
       const {id} = response.data.data
       router.push(`/confirmation/${id}`)
      }
      function calculateTotalPrice(
  price: number | undefined,
  quantity: number,
  discount: number | undefined
): string {
  let total = (price ?? 0) * quantity - (discount ?? 0);
  if (valid) {
    total -= (events?.Voucher?.[0]?.discountAmount ?? 0)
  }
  return total.toLocaleString();
}
    const checkCoupon = () => {
      dispatch(fetchCoupons())
   
    }
    const checkVoucher = () => {
      if(!voucher)  {
        setValid(false)
      } 
      console.log(events.Voucher,'event code')
     if (voucher !== events.Voucher?.[0]?.code) {
      setValid(false)
      setMessage("Voucher Tidak Valid!")
} else {
  setMessage(null);
  setValid(true)
}
    }
return (
<div className="w-10/12 mx-auto mt-32 h-[calc(100vh-6rem)]">
  <div className="flex gap-10 h-1/2">
    <div className="flex flex-col gap-8 mt-6">
      <div>
        <p className="font-semibold text-xl">Share</p>
      </div>
      <div className="flex flex-col gap-8">
        {ShareToSocialMedia.map((medsos, index) => (
          <Link
            key={index}
            href={medsos.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#4F4CEE] p-2 rounded-md w-fit hover:bg-[#4F4CEE]/10 transition"
          >
            <medsos.Image className="w-8 h-8 text-[#4F4CEE]" />
          </Link>
        ))}
      </div>
    </div>

    <div className="w-full bg-[#DADAFB] rounded-md flex items-center justify-center relative h-full">
      <Image
        src={events?.thumbnail_url || '/default-thumbnail.jpg'}
        alt="image"
        fill
        className="object-cover rounded-md px-6 py-6"
      />
    </div>
  </div>

  <div className="w-11/12 ms-22 mt-8">
    <div className="flex flex-col gap-8">
        <div className="flex justify-between">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="font-bold text-2xl">{events?.title}</h1>
                </div>
                 <div className="flex gap-2 items-center">
                  <MapPin/>
                  <h1>{events?.location}</h1>
                </div>
                 <div className="flex gap-2 items-center">
                  <CalendarCheck/>
                  <h1> {events?.time} {events?.start_date ? new Date(events.start_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year : 'numeric'
            }) : 'Date not available'}   </h1>
                </div>
                <div>
                    <h1 className="">{events?.description}</h1>
                </div>
            </div>
<div className="relative w-[290px] h-[144px] mt-6">
  <div className="absolute w-full h-full bg-[#153BF5] rounded-xl 
     -bottom-[30px] -right-5"></div>
  
  <div className="relative z-10 bg-white p-6 rounded-xl shadow-md text-center border border-black 
    translate-x-[15px] translate-y-[10px]">
    <p className="text-gray-500 text-sm">Tickets starting at</p>
    <p className="text-2xl font-bold text-gray-900">  Rp {events?.price.toLocaleString()}</p>

   <Dialog>
  <DialogTrigger asChild>
    <Button size="lg" variant="main" className="mt-4">Buy Ticket</Button>
  </DialogTrigger>

<DialogContent>
  <DialogHeader>
    <DialogTitle>Confirm Purchase</DialogTitle>
    <DialogDescription>
      Please review your purchase details before confirming.
    </DialogDescription>
  </DialogHeader>

  <div className="w-full px-4 py-4 flex flex-col gap-6">
    <div className="flex justify-between items-center w-full">
      <div className="w-full">
        <p className="text-sm font-medium">Quantity</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={decrease}>
          <Minus className="w-4 h-4" />
        </Button>
        <p className="w-8 text-center">{quantity}</p>
        <Button variant="outline" size="icon" onClick={increase}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>

    <div className="flex justify-between items-center w-full">
      <div className="w-full">
        <p className="text-sm font-medium">Point ({events?.user?.point})</p>
      </div>
      <div className="">
        <Switch id="Point" checked={checked} onCheckedChange={setChecked} />
      </div>
    </div>

    <div className="flex flex-col gap-2 w-full">
      <p className="text-sm font-medium">Coupon Code</p>
      <div className="flex items-center gap-2">
        <Input  value={coupons?.code} disabled  className="flex-1 fw-bold" placeholder="Enter code" />
        <Button variant="outline" onClick={checkCoupon}>Claim</Button>
      </div>
    </div>
<div className="flex flex-col gap-2 w-full">
  <p className="text-sm font-medium">Voucher Code</p>
  <div className="flex items-center gap-2">
    <Input
      onChange={(e) => {
        const value = e.target.value;
        setVoucher(value);
        if (value === "") {
          setMessage(null);
        }
      }}
      className="flex-1"
      placeholder="Enter code"
    />
    <Button onClick={checkVoucher} variant="outline">Claim</Button>
  </div>

  {!valid && (
    <p className="text-sm text-red-500">{message}</p>
  )}
</div>

    <div className="flex justify-between items-center w-full">
      <div>
        <p className="text-sm font-medium">Price</p>
      </div>
      <div>
<p>Rp {calculateTotalPrice(events?.price, quantity, coupons?.discountAmount)}</p>
      </div>
    </div>
  </div>

  <DialogFooter>
    <Button variant="outline">Cancel</Button>
    <Button variant="main" onClick={handleTransaction}>Confirm</Button>
  </DialogFooter>
</DialogContent>

</Dialog>
  </div>
</div>


        </div>
    </div>
  </div>
    <div className="w-11/12 ms-22 mt-12">
         <div>
         <h1 className="font-bold text-2xl">Event Information</h1>
    </div>
    <div className="flex items-center justify-between mt-12">
    {information.map((item, id)=> (
        <div key={id} className="flex items-start gap-4 ">
            <div>
  <item.Image className="w-12 h-12 text-[#4F4CEE]"/>
            </div>
       <div className="flex flex-col gap-4">
        <h1 className="font-bold text-xl">{item.text}</h1>
        <p>{item.desc}</p>
       </div>
        </div>
    ))}
    </div>
  </div>
</div>


);
};

export default EventDetailPage;
