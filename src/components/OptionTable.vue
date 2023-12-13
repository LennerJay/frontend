<template>
    <div class="dept-container">
        <div class="dept-content">
            <table id="main-table">
                <thead>
                    <tr>
                        <th>{{ name }}</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="showLoadingAnimations">
                        <td colspan="2" >
                            <div
                                class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="!isNoData" v-for="value in datas" >
                        <td>{{ value.name }}</td>
                        <td>
                            <div class="actions">
                                <button @click="handleAction('edit',value.id)" type="button" id="edit" name="edit"><i class='far fa-edit'></i>Edit</button>
                                <button @click="handleAction('delete',value.id)" type="button" id="delete" name="delete"><i class="far fa-trash-alt"></i>Delete</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="2">
                            No Data
                        </td>
                    </tr>

                </tbody>
            </table>
        </div><!-- End of dept-content -->
    </div><!-- End of dept-container -->
</template>

<script setup>



const props = defineProps([
    'datas',
    'name',
    'showLoadingAnimations',
    'isNoData'
])
const emits = defineEmits([
    'edit','delete'
]);

const handleAction = (option,id) => {

    console.log(id)
};

</script>

<style scoped>

    /* Content Goes Here */
    .dept-container {
        width: 100%;
        margin: 60px auto 130px auto;
    }

    .header-container .dept-content {
        width: 100%;
        margin: auto;
    }

    .dept-content #main-table {
        width: 80%;
        margin: auto;
        border-collapse: collapse;
    }

    #main-table tr th {
        font-family: "Times New Roman";
        font-size: 18px;
    }

    #main-table tr th, td {
        border: 1px solid gray;
        padding: 8px;
    }

    #main-table tr td {
        font-size: 14px;
    }

    #main-table tr td:last-child {
        text-align: center;
    }

    #main-table tbody tr td:last-child .actions button#edit {
        border: none;
        outline: none;
        background-color: #0C4A6E;
        color: #ffffff;
        padding: 8px 12px;
        display: inline-block;
        font-size: 13px;
        margin-right: 8px;
        cursor: pointer;
    }

    #main-table tbody tr td:last-child .actions button#delete {
        border: none;
        outline: none;
        background-color: #0C4A6E;
        color: #ffffff;
        padding: 8px 12px;
        display: inline-block;
        font-size: 13px;
        cursor: pointer;
    }

    #main-table tbody tr td:last-child .actions button#edit i,
    #main-table tbody tr td:last-child .actions button#delete i {
        font-size: 13px;
        margin-right: 3px;
    }

    #main-table tbody tr td:last-child .actions button#edit:hover {
        background-color: #0D66D0;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }

    #main-table tbody tr td:last-child .actions button#delete:hover {
        background-color: orange;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }

</style>