"use client";
import { AppDispatch } from "@/store/provider";
import { fetchTransactionDetail } from "@/store/slices/EventsSlice";
import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import { Transaction } from "@/lib/types";

const ConfirmationDetailPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const paymentId = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const [detailData, setDetailData] = useState<Transaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(
        fetchTransactionDetail(paymentId.id)
      ).unwrap();
      setDetailData(response);
    };
    fetchData();
  }, [paymentId.id]);

  return (
    <div className="w-10/12 mx-auto mt-20 h-full ">
      <div className="flex flex-col items-center justify-center w-full pt-10">
        <h1 className="font-semibold text-3xl">
          {detailData?.status === "PENDING"
            ? "Waiting for Payment"
            : detailData?.status}
        </h1>
        <div className="w-8/12 mx-auto h-16 bg-[#FBDFDF] px-6 py-6 rounded-md mt-6 text-center">
          <h1 className="text-[#EB5757] text-xl">
            {detailData?.status !== "PENDING"
              ? ""
              : `Please complete this payment before`}{" "}
            {detailData?.status === "PENDING" ? (
              <Countdown
                date={
                  new Date(detailData?.createdAt || "").getTime() +
                  2 * 60 * 60 * 1000
                }
              />
            ) : (
              ` Order Status is ${detailData?.status}`
            )}
          </h1>
        </div>
      </div>
      <div className="flex items-center flex-col w-full mx-auto h-full">
        <h1>Event Detail</h1>
      </div>
    </div>
  );
};

export default ConfirmationDetailPage;
