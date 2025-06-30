import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SendParcel = () => {
  const warehouseData = useLoaderData();
  const { user } = useAuth();
  const regions = [...new Set(warehouseData.map((w) => w.region))];

  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");

  const getDistrictsByRegion = (region) =>
    warehouseData.filter((w) => w.region === region).map((w) => w.district);

  const handleConfirm = (formData, total) => {
    const parcelData = {
      ...formData,
      trackingId: uuidv4(),
      pickup_scheduled_at: new Date(formData.pickupDateTime).toISOString(),
      creation_date: new Date().toISOString(),
      created_by_email: user?.email || "unknown",
      status: "Pending",
      paymentStatus: "Unpaid",
      price: total,
    };

    // TODO: Save to your backend here (e.g., POST request)

    Swal.fire({
      icon: "success",
      title: "Parcel Added Successfully!",
      text: "Your parcel has been submitted.",
      timer: 2000,
      showConfirmButton: false,
    });

    toast.success("📦 Parcel added successfully!");
    reset();
    setSelectedSenderRegion("");
    setSelectedReceiverRegion("");
  };

  const onSubmit = async (data) => {
    const { type, weight, senderServiceCenter, receiverServiceCenter } = data;
    const w = parseFloat(weight) || 0;
    const withinCity = senderServiceCenter === receiverServiceCenter;

    let base = 0;
    let extraWeight = 0;
    let extraCharge = 0;
    let outsideCharge = 0;
    const typeLabel = type === "document" ? "Document" : "Non-Document";

    if (type === "document") {
      base = withinCity ? 60 : 80;
    } else {
      base = withinCity ? 110 : 150;
      if (w > 3) {
        extraWeight = w - 3;
        extraCharge = extraWeight * 40;
        if (!withinCity) outsideCharge = 40;
      }
    }

    const total = base + extraCharge + outsideCharge;

    const breakdownHtml = `
      <div style="text-align: left;">
        <p><strong>Parcel Type:</strong> ${typeLabel}</p>
        ${type === "non-document" ? `<p><strong>Weight:</strong> ${w} kg</p>` : ""}
        <p><strong>Pickup Time:</strong> ${new Date(data.pickupDateTime).toLocaleString()}</p>
        <hr/>
        <p><strong>Base Charge:</strong> ৳${base}</p>
        ${extraCharge ? `<p><strong>Extra Weight (${extraWeight}kg x ৳40):</strong> ৳${extraCharge}</p>` : ""}
        ${outsideCharge ? `<p><strong>Outside District Fee:</strong> ৳${outsideCharge}</p>` : ""}
        <hr/>
        <h2><strong>Total Cost: <span style="color:#10b981;">৳${total}</span></strong></h2>
      </div>
    `;

    const result = await Swal.fire({
      title: "Confirm Delivery Cost",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Edit Parcel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      handleConfirm(data, total);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-2 text-center">Add Parcel</h2>
      <p className="text-center mb-6 text-gray-500">Fill out the details to send a parcel</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="border p-4 rounded-md">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>

          <div className="form-control">
            <label className="label">Type</label>
            <div className="flex gap-6">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-blue-500"
                />
                <span className="label-text ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-blue-500"
                />
                <span className="label-text ml-2">Non-Document</span>
              </label>
            </div>
            {errors.type && <p className="text-error text-sm">Type is required</p>}
          </div>

          <div className="form-control mt-4">
            <label className="label">Parcel Name</label>
            <input
              placeholder="Describe your parcel"
              {...register("title", { required: true })}
              className="input input-bordered"
            />
            {errors.title && <p className="text-error text-sm">Title is required</p>}
          </div>

          {parcelType === "non-document" && (
            <div className="form-control mt-4">
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register("weight")}
                className="input input-bordered"
              />
            </div>
          )}
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Sender Info</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  defaultValue="LoggedUser"
                  {...register("senderName", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  defaultValue={user?.email || ""}
                  {...register("senderEmail", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Contact</label>
                <input
                  {...register("senderContact", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered"
                  onChange={(e) => setSelectedSenderRegion(e.target.value)}
                  value={selectedSenderRegion}
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Service Center</label>
                <select
                  {...register("senderServiceCenter", { required: true })}
                  className="select select-bordered"
                >
                  <option value="">Select District</option>
                  {getDistrictsByRegion(selectedSenderRegion).map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Address</label>
                <input
                  {...register("senderAddress", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Pickup Instruction</label>
                <textarea
                  {...register("pickupInstruction", { required: true })}
                  className="textarea textarea-bordered"
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">Pickup Date & Time</label>
                <input
                  type="datetime-local"
                  {...register("pickupDateTime", { required: true })}
                  className="input input-bordered"
                />
                {errors.pickupDateTime && (
                  <p className="text-error text-sm">Pickup time is required</p>
                )}
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="border p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  {...register("receiverName", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Contact</label>
                <input
                  {...register("receiverContact", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered"
                  onChange={(e) => setSelectedReceiverRegion(e.target.value)}
                  value={selectedReceiverRegion}
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Service Center</label>
                <select
                  {...register("receiverServiceCenter", { required: true })}
                  className="select select-bordered"
                >
                  <option value="">Select District</option>
                  {getDistrictsByRegion(selectedReceiverRegion).map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Address</label>
                <input
                  {...register("receiverAddress", { required: true })}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Delivery Instruction</label>
                <textarea
                  {...register("deliveryInstruction", { required: true })}
                  className="textarea textarea-bordered"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary px-10">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
