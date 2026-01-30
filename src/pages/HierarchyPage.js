// import React from "react";
// import { hierarchyData } from "../data/sampleData";
// import HierarchyTree from "../components/hierarchy/HierarchyTree";

// const HierarchyPage = () => {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Hierarchy</h1>
//           <div className="text-muted">
//             Organization → Users → Sites → Devices
//           </div>
//         </div>
//       </div>

//       <HierarchyTree data={hierarchyData} />
//     </div>
//   );
// };

// export default HierarchyPage;

import React from "react";
import { hierarchyData } from "../data/sampleData";
import HierarchyTree from "../components/hierarchy/HierarchyTree";

const HierarchyPage = () => {
  return (
    <div className="page">
      <div
        className="page-header page-header--center"
        style={{ marginBottom: 20 }}
      >
        <div>
          <h1 className="page-title">Hierarchy</h1>
          <div className="text-muted">
            Organization → Users → Sites → Devices
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <HierarchyTree data={hierarchyData} />
      </div>
    </div>
  );
};

export default HierarchyPage;