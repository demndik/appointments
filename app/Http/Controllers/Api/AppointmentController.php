<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Appointment as AppModel;
use App\Person as PersonModel;
use App\Company as CompanyModel;

class AppointmentController extends Controller
{
    public function listApps(Request $request)
    {
        $apps = AppModel::listApps()->get();
        return response($apps, 200);
    }

    public function getApp(Request $request, $id = 0)
    {
        $app = AppModel::getApp($id)->get();
        return response($app, 200);
    }

    public function saveResultApp(Request $request)
    {
        $this->validate($request, [
            'id'    => 'required|numeric|int',
            'result' => 'required|max:255',
        ]);
        AppModel::saveResultApp($request->input('id'), $request->input('result'));
        return response('ok', 200);
    }

    public function updateApp(Request $request)
    {
        $this->validate($request, [
            'id'    => 'required|numeric|int',
            'c_name' => 'required|max:255',
            'c_locality' => 'required|max:100',
            'c_street'  => 'required|alpha_dash|max:30',
            'c_house'  => 'required|alpha_dash|max:10',
            'c_postal'  => 'numeric',
            'c_site'  => 'required|max:255',
            'p_fname'  => 'required|alpha_dash|max:50',
            'p_lname'  => 'required|alpha_dash|max:50',
            'p_phone'  => 'alpha_dash|max:50',
            'p_email'  => 'email',
            'p_salutation'  => 'required|string|max:70',
            'app_date'  => 'required|date_format:Y-m-d',
            'app_time'  => 'required|date_format:H:i:s',
        ]);
        $app = AppModel::getApp($request->input('id'))->get();
        if(1 == count($app))
        {
            $company_data = [
                'name'  => $request->input('c_name'),
                'locality'  => $request->input('c_locality'),
                'street'    => $request->input('c_street'),
                'house' => $request->input('c_house'),
                'postal'    => $request->input('c_postal'),
                'site'  => $request->input('c_site'),
            ];
            $person_data = [
                'fname'   => $request->input('p_fname'),
                'lname'   => $request->input('p_lname'),
                'phone'   => $request->input('p_phone'),
                'email'   => $request->input('p_email'),
                'salutation'  => $request->input('p_salutation'),
            ];
            $app_data = [
                'date'  => $request->input('app_date'),
                'time'  => $request->input('app_time'),
            ];
            CompanyModel::updateCompany($app[0]->company_id, $company_data);
            PersonModel::updatePerson($app[0]->person_id, $person_data);
            AppModel::updateApp($request->input('id'), $app_data);
        }
        return response('ok', 200);
    }

    public function updateStatusApp(Request $request)
    {
        $this->validate($request, [
            'id'    => 'required|numeric|int',
            'status' => 'required|numeric|int',
        ]);
        AppModel::updateApp($request->input('id'), ['status' => $request->input('status')]);
        return response('ok', 200);
    }
}