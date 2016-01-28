/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.app;

import com.wesoft.beacon.infra.repositories.criteria.SiteCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wesoft.beacon.domain.Site;
import com.wesoft.beacon.infra.repositories.SiteRepository;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: SiteService.java, v 0.1 2016/1/25 13:20 $
 */
@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    public void modifyCityId(String id, String cityId) {
        Site site = siteRepository.findOne(id);
        site.modifyCityId(cityId);
        siteRepository.save(site);
    }

    public Site findByCityId(String cityId) {
        return siteRepository.findOne(SiteCriteria.findByCity(cityId));
    }

    public Page<Site> findByPage(int pageNumber, int pageSize) {
        Pageable pageable = new PageRequest(pageNumber, pageSize);
        return siteRepository.findAll(pageable);
    }

}
