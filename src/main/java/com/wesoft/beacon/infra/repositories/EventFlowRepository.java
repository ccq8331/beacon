/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.infra.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.wesoft.beacon.domain.EventFlow;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: EventFlowRepository.java, v 0.1 2016/1/28 10:27 $
 */
@Repository
public interface EventFlowRepository extends JpaRepository<EventFlow, Integer>,
                                     JpaSpecificationExecutor<EventFlow> {
}
