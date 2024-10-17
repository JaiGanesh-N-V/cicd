import { sendResponse } from "../common/common.js";
import { CODES } from "../common/response-code.js";
import { logger } from "../logger/logger.js";

export default class getDashboardDataService{
    #dashboardProductData;
    #dashboardUserData;
    #dashboardOrderData;
    constructor(productData,userData,orderData){
        this.#dashboardProductData=productData;
        this.#dashboardUserData=userData;
        this.#dashboardOrderData=orderData;
  }

  
dashboardData=async req=>{
    try{
        let productData=await this.#dashboardProductData.find();
        let userData=await this.#dashboardUserData.find();
        let orderData = await this.#dashboardOrderData.find();
        
        let lastWeekorderData = await this.#dashboardOrderData.find({"createdOn":{  $lt: new Date(), 
            $gte: new Date(new Date().setDate(new Date().getDate()-7))}});
        
        let lastMonthOrderData = await this.#dashboardOrderData.find({"createdOn":{  $lt: new Date(), 
            $gte: new Date(new Date().setDate(new Date().getDate()-30))}});
        
        let lastMonthYarnCount = lastMonthOrderData.filter((item)=>{
            return item.category === 'yarn';
        });

        let lastMonthFabricCount = lastMonthOrderData.filter((item)=>{
            return item.category === 'fabric';
        });

        let lastWeakFabricCount = lastWeekorderData.filter((item)=>{
            return item.category === 'fabric';
        });

        let lastWeakYarnCount = lastWeekorderData.filter((item)=>{
            return item.category === 'yarn';
        });

        let approvedOrder = orderData.filter((item)=>{
            return item.status === 'VERIFIED';
        });

        let buyerCount = userData.filter((item)=>{
            return item.role === 'BUYER';
        }).length;

        let agentCount = userData.filter((item)=>{
            return item.role === 'AGENT';
        }).length;


        let nonApprovedOrder = orderData.filter((item)=>{
            return item.status === 'QUEUED';
        });
        
        let yarnProduct = productData.filter(item=>{
            return item.category === 'yarn';
        });

        let totalYarnStock=0
        yarnProduct.forEach(item => {
            totalYarnStock += item.quantity;
        });
        

        let fabricProduct = productData.filter(item=>{
            return item.category === 'fabric';
        })

        let totalFabricStock=0
        fabricProduct.forEach(item => {
            totalFabricStock += item.quantity;
        });

        let dashdata={totalUserCount:userData.length, totalOrderCount:orderData.length,totalProductCount:productData.length,countOfBuyer:buyerCount,countOfAgent:agentCount,approvedOrderNo:approvedOrder.length,nonApprovedOrderNo:nonApprovedOrder.length,totalYarnCount:totalYarnStock,totalFabricCount:totalFabricStock, lastWeakYarnOrderCount:lastWeakYarnCount.length, lastWeakFabricOrderCount:lastWeakFabricCount.length, lastMonthFabricOrderCount:lastMonthFabricCount.length, lastMonthYarnOrderCount:lastMonthYarnCount.length};

        return sendResponse(CODES.OK, dashdata);

    }
    catch(error){
        logger.error(error);
        throw error("Error in dashboard Data API")
    }
}
}