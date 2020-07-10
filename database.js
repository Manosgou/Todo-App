export const TaskSchema ={
    name: 'TASK_SCHEMA',
    properties: {
        id: 'string',
        title: 'string',
        description: 'string',
        importance: 'string',
        isFinished: {type:'bool',default:false},
        created: 'string'
    }
};

export const TasksListSchema ={
    name: 'TASKS_LIST_SCHEMA',
    properties: {
        tasks:{type:'list',objectType:'TASK_SCHEMA'}
    }
};


