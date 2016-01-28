/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: EventFlowPrototypeOperation.java, v 0.1 2016/1/28 9:55 $
 */
@Entity
@Table(name = "event_flow_prototype_operation")
public class EventFlowPrototypeOperation {

    @Id
    @Column
    private Integer id;

    @Column(name = "session_id")
    private String sessionId;

    @Column
    private String operation;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
}
