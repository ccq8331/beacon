/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.web.mvc;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: ProjectController.java, v 0.1 2016/1/28 9:53 $
 */
@RestController
@RequestMapping("/project")
public class ProjectController {

    @RequestMapping
    public ModelAndView init() {
        return new ModelAndView("project");
    }

}
