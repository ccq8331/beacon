/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.domain;

import javax.persistence.*;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: SiteModel.java, v 0.1 2016/1/25 13:58 $
 */
@Entity
@Table(name = "site")
public class Site {

    @Column(name = "city_id")
    private String cityId;

    @Column(name = "district_id")
    private String districtId;

    @Column(name = "site_type")
    private String siteType;

    @Id
    @Column(name = "site_id")
    private String siteId;

    @Column(name = "site_name")
    private String siteName;

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getSiteType() {
        return siteType;
    }

    public void setSiteType(String siteType) {
        this.siteType = siteType;
    }

    public String getDistrictId() {
        return districtId;
    }

    public void setDistrictId(String districtId) {
        this.districtId = districtId;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getSiteName() {
        return siteName;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    @Override
    public String toString() {
        return "Site{" + "cityId='" + cityId + '\'' + ", districtId='" + districtId + '\'' + ", siteType='"
               + siteType + '\'' + ", siteId='" + siteId + '\'' + ", siteName='" + siteName + '\'' + '}';
    }

    public void modifyCityId(String cityId) {
        this.cityId = cityId;
    }
}
