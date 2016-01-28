/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.wesoft.beacon.domain.Site;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: SiteRepository.java, v 0.1 2016/1/25 10:34 $
 */
public interface SiteRepository extends JpaRepository<Site, String>, JpaSpecificationExecutor<Site> {

}
