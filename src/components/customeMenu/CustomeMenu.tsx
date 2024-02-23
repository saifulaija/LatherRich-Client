/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';


const CustomeMenu = ({ isInline = false }) => {
    const navigate = useNavigate()

    const onMenuClick = (item:any) => {
        navigate(`/${item.key}`);
        console.log(item);
      };
    
    return (
        <div>
              <Menu
        style={{ width: "100%", border: "none" }}
        onClick={onMenuClick}
        theme="light"
        mode={isInline ? "inline" : "horizontal"}
        items={[
       
          {
            label: "MEN",
            key: "men",
            children: [
              {
                label: "CASUAL",
                key: "mans-casual",
                title: "mans-casual",
               
              },
              {
                label: "FORMAL",
                key: "mans-formal",
                title: "mans-formal",
              },
              {
                label: "SANDALS",
                key: "mens-sandals",
                title: "mens-sandals",
              },
              {
                label: "SPORTS",
                key: "mens-sports",
                title: "mens-sports",
              },
            ],
          },
          {
            label: "WOMEN",
            key: "women",
            children: [
                {
                    label: "CASUAL",
                    key: "mans-casual",
                    title: "mans-casual",
                   
                  },
                  {
                    label: "FORMAL",
                    key: "mans-formal",
                    title: "mans-formal",
                  },
                  {
                    label: "SANDALS",
                    key: "mens-sandals",
                    title: "mens-sandals",
                  },
                  {
                    label: "PUMP SHOES",
                    key: "mens-sports",
                    title: "mens-sports",
                  },
            ],
          },
          {
            label: "GOODS",
            key: "accessories",
            children: [
              {
                label: "MONEY BAGS",
                key: "accessories-money-bags",
                title: "accessories-money-bags",
              },
              {
                label: "BELTS",
                key: "accessories-belts",
                title: "accessories-belts",
              },
            ],
          },
        ]}
      />
        </div>
    );
};

export default CustomeMenu;