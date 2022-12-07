import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    gi: "",
    weight: "",
    height: "",
    ldl: "",
    hdl: "",
    triglyceride: "",
    save: false,
  });

  const { gi, weight, height, ldl, hdl, triglyceride, save } = formData;

  const updateFormData = (event) => {
    if (event.target.name === "save") {
      setFormData({
        ...formData,
        save: event.target.checked,
      });
    } else
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/hi", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      });
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="self-center bg-emerald-200 px-[700px] h-100 py-40">
        <div className="pt-2">
          <label className="" htmlFor="gi">
            Chỉ số đường huyết
          </label>
          <input
            value={gi}
            onChange={(e) => updateFormData(e)}
            placeholder="Chỉ số đường huyết"
            type="text"
            name="gi"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2">
          <label className="" htmlFor="weight">
            Cân nặng
          </label>
          <input
            value={weight}
            onChange={(e) => updateFormData(e)}
            placeholder="Cân nặng"
            type="text"
            name="weight"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2">
          <label className="" htmlFor="height">
            Chiều cao
          </label>
          <input
            value={height}
            onChange={(e) => updateFormData(e)}
            placeholder="Chiều cao"
            type="text"
            name="height"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2">
          <label className="" htmlFor="ldl">
            Chỉ số LDL
          </label>
          <input
            value={ldl}
            onChange={(e) => updateFormData(e)}
            placeholder="Chỉ số LDL"
            type="text"
            name="ldl"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2">
          <label className="" htmlFor="hdl">
            Chỉ số HDL
          </label>
          <input
            value={hdl}
            onChange={(e) => updateFormData(e)}
            placeholder="hdl"
            type="text"
            name="hdl"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2">
          <label className="" htmlFor="triglyceride">
            Chỉ số triglyceride
          </label>
          <input
            value={triglyceride}
            onChange={(e) => updateFormData(e)}
            placeholder="Chỉ số triglyceride"
            type="text"
            name="triglyceride"
            className="shadow-sm    border-gray-300   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          />
        </div>
        <div className="pt-2 flex flex-rows">
          <input
            type="checkbox"
            id="save"
            name="save"
            checked={save}
            onChange={(e) => updateFormData(e)}
          />
          <label className="pl-2" htmlFor="save">
            Lưu lại thông tin của tôi
          </label>
        </div>
        <br />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Bắt đầu tính toán
        </button>
      </div>
    </form>
  );
};

export default Form;
