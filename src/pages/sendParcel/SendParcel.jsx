import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// Division → District mapping from wiki data
const REGION_DATA = {
  Dhaka: ["Dhaka","Faridpur","Gazipur",/* ... */"Tangail"],
  Chattogram: ["Chattogram","Cox's Bazar",/* ... */"Rangamati"],
  Khulna: ["Khulna","Jessore",/*...*/"Satkhira"],
  Rajshahi: ["Rajshahi","Bogra",/*...*/"Sirajganj"],
  Rangpur: ["Rangpur","Dinajpur",/*...*/"Thakurgaon"],
  Sylhet: ["Sylhet","Habiganj","Sunamganj","Moulvibazar"],
  Barishal: ["Barishal","Patuakhali",/*...*/"Jhalokathi"],
  Mymensingh: ["Mymensingh","Jamalpur","Sherpur","Netrokona"]
};

const SendParcel = () => {
  const [districts, setDistricts] = useState([]);
  const [costPreview, setCostPreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState(null);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  useEffect(() => {
    if (senderRegion) setDistricts(REGION_DATA[senderRegion] || []);
  }, [senderRegion]);

  const calculateCost = data => {
    let cost = 50;
    if (data.type === "non-document") {
      cost += (parseFloat(data.weight) || 0) * 10;
    }
    if (data.senderServiceCenter !== data.receiverServiceCenter) cost += 30;
    return cost;
  };

  const onSubmit = data => {
    const cost = calculateCost(data);
    setCostPreview(cost);
    setFormData(data);
    setShowConfirm(true);
    toast.info(`Delivery cost is ৳${cost}. Please confirm.`, { autoClose: 3000 });
  };

  const handleConfirm = () => {
    const payload = { ...formData, cost: costPreview, creation_date: new Date().toISOString() };
    console.log("Saving:", payload);
    toast.success("Parcel added!");
    reset();
    setShowConfirm(false);
    setCostPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Send Parcel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Parcel Type */}
        <div className="form-control">
          <label className="label">Parcel Type</label>
          <div className="flex space-x-4">
            <label className="cursor-pointer">
              <input type="radio" value="document" {...register("type", { required: true })} className="radio radio-primary mr-1" /> Document
            </label>
            <label className="cursor-pointer">
              <input type="radio" value="non-document" {...register("type", { required: true })} className="radio radio-primary mr-1" /> Non‑Document
            </label>
          </div>
          {errors.type && <p className="text-error text-sm">Select a parcel type.</p>}
        </div>

        {/* Parcel Title & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">Title</label>
            <input {...register("title", { required: true })} className="input input-bordered" />
            {errors.title && <p className="text-error text-sm">Title is required.</p>}
          </div>
          {parcelType === "non-document" && (
            <div className="form-control">
              <label className="label">Weight (kg)</label>
              <input type="number" step="0.1" {...register("weight", { required: true })} className="input input-bordered" />
              {errors.weight && <p className="text-error text-sm">Weight is required.</p>}
            </div>
          )}
        </div>

        {/* Sender & Receiver side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-4">Sender Info</h3>
            <div className="space-y-3">
              {["Name", "Contact", "Address"].map(label => (
                <div key={label} className="form-control">
                  <label className="label">{label}</label>
                  <input {...register(`sender${label}`, { required: true })} className="input input-bordered" />
                </div>
              ))}
              <div className="form-control">
                <label className="label">Region</label>
                <select {...register("senderRegion", { required: true })} className="select select-bordered">
                  <option value="">Select Region</option>
                  {Object.keys(REGION_DATA).map(reg => <option key={reg}>{reg}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Service Center (District)</label>
                <select {...register("senderServiceCenter", { required: true })} className="select select-bordered">
                  <option value="">Select District</option>
                  {(districts || []).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Pickup Instructions</label>
                <textarea rows={2} {...register("pickupInstruction", { required: true })} className="textarea textarea-bordered" />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="p-4 border rounded">
            <h3 className="font-semibold mb-4">Receiver Info</h3>
            <div className="space-y-3">
              {["Name", "Contact", "Address"].map(label => (
                <div key={label} className="form-control">
                  <label className="label">{label}</label>
                  <input {...register(`receiver${label}`, { required: true })} className="input input-bordered" />
                </div>
              ))}
              <div className="form-control">
                <label className="label">Region</label>
                <select {...register("receiverRegion", { required: true })} className="select select-bordered">
                  <option value="">Select Region</option>
                  {Object.keys(REGION_DATA).map(reg => <option key={reg}>{reg}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Service Center (District)</label>
                <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered">
                  <option value="">Select District</option>
                  {(REGION_DATA[receiverRegion] || []).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Delivery Instructions</label>
                <textarea rows={2} {...register("deliveryInstruction", { required: true })} className="textarea textarea-bordered" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Calculate Cost</button>
        </div>

        {/* Confirm Cost */}
        {showConfirm && (
          <div className="text-center mt-4">
            <button onClick={handleConfirm} type="button" className="btn btn-success">
              Confirm & Send (৳{costPreview})
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SendParcel;

