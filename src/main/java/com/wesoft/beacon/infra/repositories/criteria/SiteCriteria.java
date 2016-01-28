/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.infra.repositories.criteria;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.wesoft.beacon.domain.Site;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: SiteQueryRepository.java, v 0.1 2016/1/27 17:34 $
 */
public class SiteCriteria {

    public static Specification<Site> findByCity(String cityId) {
        return (Root<Site> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            Path<String> cityIdPath = root.get("cityId");
            query.where(cb.equal(cityIdPath, cityId));
            return query.getRestriction();
        };
    }

}
