import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol ,backendUrl,token,getDoctorsData} = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  // Fetch doctor info
  const fetchDoctorInfo = () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  // Get available slots
  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDay();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if(isSlotAvailable) {

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        });
      }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if(!token) {
      toast.warn('Please login to book an appointment');
      return  navigate('/login');
    }

    try{
      const date = docSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + '_' + month + '_' + year;
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate, slotTime}, {headers: { Authorization: `Bearer ${token}` }})
      if(data.success){
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDoctorInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Loading doctor information...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row gap-8 bg-white border border-gray-200 rounded-lg shadow-md p-6">
        {/* Doctor Image */}
        <div className="flex-shrink-0">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-full sm:w-72 rounded-lg object-cover shadow"
          />
        </div>

        {/* Doctor Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Name and Verified */}
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">{docInfo.name}</h1>
              <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
            </div>

            {/* Degree & Speciality */}
            <p className="text-gray-700 text-lg mb-3">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            {/* Experience */}
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md font-medium mb-4 cursor-default">
              {docInfo.experience} years Experience
            </button>

            {/* About Section */}
            <div className="mt-4">
              <p className="flex items-center gap-2 font-semibold text-gray-800 mb-2">
                About <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
              </p>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            {/* Appointment Fee */}
            <p className="mt-4 text-gray-800 font-medium text-lg">
              Appointment Fee: <span className="font-semibold">{currencySymbol}{docInfo.fee}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Booking Slots Section */}
      <div className="sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700">
        <p className="mb-4 text-lg">Booking Slots</p>
        <div className="flex gap-4 overflow-x-auto">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-3 px-4 min-w-16 rounded-full cursor-pointer transition-all ${
                  slotIndex === index ? 'bg-[#5f6FFF] text-white' : 'border border-gray-200'
                }`}
              >
                <p className="font-semibold">
                  {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                </p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow x-scroll mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item,index) => (
            <p onClick={()=> setSlotTime(item.time)} className = {`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6FFF] text-white':'text-gray-400 border border-gray-300'}`} key = {index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-[#5f6FFF] text-white px-6 py-3 rounded-full mt-6 hover:bg-[#4e5fe0] transition disabled:bg-gray-300' disabled = {!slotTime}>
          Book An Appointment
        </button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;



//10.48.19