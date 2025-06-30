import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useLoaderData } from "react-router";
import "react-toastify/dist/ReactToastify.css";

const SendParcel = () => {
  const warehouseData = useLoaderData(); // Get service center data

  // Extract unique region names
  const regions = [...new Set(warehouseData.map((w) => w.region))];

  const [selectedSenderRegion, setSelectedSenderRegion] = useState("");
  const [selectedReceiverRegion, setSelectedReceiverRegion] = useState("");

  const [, setCostPreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const parcelType = watch("type");

  // Updated cost calculation following your pricing structure
  const calculateCost = (data) => {
    const { type, weight, senderServiceCenter, receiverServiceCenter } = data;
    const w = parseFloat(weight) || 0;
    const withinCity = senderServiceCenter === receiverServiceCenter;

    if (type === "document") {
      return withinCity ? 60 : 80;
    }

    if (type === "non-document") {
      if (w <= 3) {
        return withinCity ? 110 : 150;
      } else {
        const extraWeight = w - 3;
        if (withinCity) {
          return 110 + extraWeight * 40;
        } else {
          return 150 + extraWeight * 40 + 40;
        }
      }
    }

    return 0; // fallback cost
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setCostPreview(cost);
    setShowConfirm(true);

    toast.info(`Delivery cost is ৳${cost}. Click confirm to proceed.`, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
  };

  const handleConfirm = () => {
    // Here you can call your API to save parcel with creation_date and form data

    toast.success("Parcel added successfully!");
    reset();
    setShowConfirm(false);
    setSelectedSenderRegion("");
    setSelectedReceiverRegion("");
    setCostPreview(null);
  };

  // Filter service centers by selected region
  const getDistrictsByRegion = (region) =>
    warehouseData.filter((w) => w.region === region).map((w) => w.district);

  return (
    <>
      <div className="max-w-5xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">Add Parcel</h2>
        <p className="text-center mb-6 text-gray-500">
          Fill out the details to send a parcel
        </p>

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
              {errors.type && (
                <p className="text-error text-sm">Type is required</p>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label">Parcel Name</label>
              <input
                placeholder="Describe your parcel"
                {...register("title", { required: true })}
                className="input input-bordered"
              />
              {errors.title && (
                <p className="text-error text-sm">Title is required</p>
              )}
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
                  {errors.senderName && (
                    <p className="text-error text-sm">Sender name is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Contact</label>
                  <input
                    {...register("senderContact", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.senderContact && (
                    <p className="text-error text-sm">
                      Sender contact is required
                    </p>
                  )}
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
                  {errors.senderRegion && (
                    <p className="text-error text-sm">Sender region is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Service Center</label>
                  <select
                    {...register("senderServiceCenter", { required: true })}
                    className="select select-bordered"
                  >
                    <option value="">Select District</option>
                    {getDistrictsByRegion(selectedSenderRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.senderServiceCenter && (
                    <p className="text-error text-sm">
                      Sender service center is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Address</label>
                  <input
                    {...register("senderAddress", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.senderAddress && (
                    <p className="text-error text-sm">Sender address is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Pickup Instruction</label>
                  <textarea
                    {...register("pickupInstruction", { required: true })}
                    className="textarea textarea-bordered"
                  ></textarea>
                  {errors.pickupInstruction && (
                    <p className="text-error text-sm">
                      Pickup instruction is required
                    </p>
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
                  {errors.receiverName && (
                    <p className="text-error text-sm">Receiver name is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Contact</label>
                  <input
                    {...register("receiverContact", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.receiverContact && (
                    <p className="text-error text-sm">
                      Receiver contact is required
                    </p>
                  )}
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
                  {errors.receiverRegion && (
                    <p className="text-error text-sm">
                      Receiver region is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Service Center</label>
                  <select
                    {...register("receiverServiceCenter", { required: true })}
                    className="select select-bordered"
                  >
                    <option value="">Select District</option>
                    {getDistrictsByRegion(selectedReceiverRegion).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.receiverServiceCenter && (
                    <p className="text-error text-sm">
                      Receiver service center is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Address</label>
                  <input
                    {...register("receiverAddress", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.receiverAddress && (
                    <p className="text-error text-sm">
                      Receiver address is required
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">Delivery Instruction</label>
                  <textarea
                    {...register("deliveryInstruction", { required: true })}
                    className="textarea textarea-bordered"
                  ></textarea>
                  {errors.deliveryInstruction && (
                    <p className="text-error text-sm">
                      Delivery instruction is required
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="btn btn-primary px-10">Submit</button>
          </div>

          {/* Confirm Button */}
          {showConfirm && (
            <div className="text-center mt-4">
              <button
                className="btn btn-success"
                onClick={handleConfirm}
                type="button"
              >
                Confirm & Save Parcel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Toast container added here or put it in your root App */}
      <ToastContainer />
    </>
  );
};

export default SendParcel;
