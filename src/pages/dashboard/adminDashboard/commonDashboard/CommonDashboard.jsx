import Donation from "../../../../components/dashboard/charts/donation/Donation";
import PerFormance from "../../../../components/dashboard/charts/performance/PerFormance";

import Visitors from "../../../../components/dashboard/charts/visitors/Visitors";
import { useGetChartQuery } from "../../../../redux/dashboardFeatures/getDashboardChartApi";

const CommonDashboard = () => {
  const { data } = useGetChartQuery();

  const dashboardData = data?.data




  return (
    <div>
      {/* dashboard curds */}
      <div className="grid grid-cols-12 gap-[20px]">
        {/* card one */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Approved Volunteers</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.approvedVolunteers}</h2>
        </div>

        {/* card two */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Declared Auctions</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.declaredAuctions}</h2>
        </div>

        {/* card thre */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Unique Contributors</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.uniqueContributors}</h2>
        </div>

        {/* card four */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Podcasts</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">
            {dashboardData?.podcastsCount}
          </h2>
        </div>

        {/* card five */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Subscribers</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.subscribersCount}</h2>
        </div>

        {/* card six */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2 className="text-white font-roboto">Teams</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.teamsCount}</h2>
        </div>

        {/* card seven */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Paid Transitions</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">{dashboardData?.paidTransitions}</h2>
        </div>

        {/* card eight */}
        <div className="col-span-10 md:col-span-11 lg:col-span-3 max-h-[120px] bg-primary text-[#ffffff] p-[20px] rounded-lg">
          <h2>Volunteers</h2>
          <h2 className="font-semibold text-[30px] text-[#ffffff]">
            {dashboardData?.approvedVolunteers}
          </h2>
        </div>
      </div>





      {/* chart one/two components */}
      {/* chart three components */}
      <div className="bg-[#1B2324] w-full md:h-[580px] rounded-lg mt-6">
        <Donation />
      </div>

    </div>
  );
};

export default CommonDashboard;
